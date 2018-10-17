var request = require('request');
/** Auth route */
var auth = "http://localhost:8080/auth/";
/** SUrvey route */
var api = 'http://localhost:8080/api/';
/** User route */
var api2 = "http://localhost:8080/api2/";
/** Survey data to add survey */
var survey = { 
	cols: [ 1, 1, 1, 1, 1, 1, 1 ],
	register: ['k'],
	questionnaire: ['k'],
	statements: ['k', 'k', 'k', 'k', 'k', 'k', 'k'],
	name: 'test',
	range: 7,
	publish: false,
	users: []
};
/** Initial sort data to update user */
var initialsort = {
	sort_agree: [1, 2, 3],
	sort_neutral: [4, 5],
	sort_disagree: [6, 7],
}
/** Survey id */
var id;
/** Published survey id */
var pid;
/** User id */
var uid;
/** Updated surveys */
var update = survey;
/** Headers */
var headers = {
	qmd : 'ng-client'
}
/** Cookie jar */
var j = request.jar();

/** Test Auth Route */
describe('Auth Route', function() {
	describe("Authenticate username/password", function() {
		var params;
			beforeEach(function(done) {
				params = {
					url: auth,
					json: true,
					body: {
						username: 'admin',
						password: 'password'
					},
					jar: j
					};
					done();
			});
			it('Should authenticate', function(done) {
				request.post(params, function(err, res, body) {
					expect(res.statusCode).toBe(200);
					expect(res.body).toBe('User/Password Authenticated');
					done();
				});
			});

			it('Should not authenticate', function(done) {
				params.body.username = "bad";
				request.post(params, function(err, res, body) {
					expect(res.statusCode).toBe(400);
					done();
				});
			});
		});

	/** Test valid token route */
	describe("check token", function() {
		var params;
		beforeEach(function(done) {
			params = {
				url: auth + 'token',
				json: true,
				jar: j
			};
			done();
		});

		it('Should be valid token', function(done) {
			request.get(params, function(err, res, body) {
			expect(res.body).toBe('Authenticated Token')
			expect(res.statusCode).toBe(200);
			done();
			});
		});

		it('Should be invalid token', function(done) {
			var jar1 = request.jar();
			jar1.setCookie(request.cookie('SESSION_ID=INVALID'), params.url);
			params.jar = jar1;
			request.get(params, function(err, res, body) {
			expect(res.body).toBe('Invalid token');
			expect(res.statusCode).toBe(400);
			done();
			});
		});
	});
});


/** Test Survey Route */
describe('Survey Route', function(){
	/** Test /GET routes */
	describe('/GET', function() {
		var params;
		beforeEach(function(done) {
			params = {
				url: api,
				headers: headers,
				jar: j,
			};
			done();
		});

		it('Should get all survey', function(done) {
			request.get(params, function(err, res, body) {
				expect(res.statusCode).toBe(200);
				var b = JSON.parse(body);
				for (var i = 0; i < b.length; i++) {
					if (b[i].publish == true) {
						pid = b[i]._id;
						break;
					}
				}
				update = b[0];
				id = b[0]._id;
				done();
			});
		});

		it('Should get from id', function(done) {
			params.url = api + id;
			request.get(params, function(err, res, body) {
				expect(res.statusCode).toBe(200);
				expect(JSON.parse(body)).toMatch(update);
				done(); 
			});
		});

		it('Should not get from wrong id', function(done) {
			params.url = api + '-1';
			request.get(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				done(); 
			});
		});

		it('Should not get with bad cookie', function(done) {
			params.url = api;
			var jar1 = request.jar();
			jar1.setCookie(request.cookie('SESSION_ID=INVALID'), params.url);
			params.jar = jar1;
			request.get(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				expect(res.body).toBe('Bad Auth');
				done();
			});
		});
	});

	/** Test /POST Routes */
	describe('/POST', function() {
		var params;
		beforeEach(function(done) {
			params = {
				url: api,
				headers: headers,
				json: true,
				jar: j,
				body: {}
			};
			done();
		});

		it('Should not add with empty body', function(done) {
			params.url = api + 'add';
			request.post(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				expect(res.body).toBe('Bad Request');
				done();
			});
		});

		it('Should not add with bad cookie', function(done) {
			params.url = api + 'add';
			params.body = survey;
			var jar1 = request.jar();
			jar1.setCookie(request.cookie('SESSION_ID=INVALID'), params.url);
			params.jar = jar1;
			request.post(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				expect(res.body).toBe('Bad Auth');
				done();
			});
		});
	
		it('Should add survey', function(done) {
			params.url = api + 'add';
			params.body = survey;
			request.post(params, function(err, res, body){
				expect(res.statusCode).toBe(200);
				expect(res.body).toMatch('Successfully Updated');
				done();
			});
		});

		it('Should not update with bad cookie', function(done) {
			params.body.name = 'update';
			params.url = api + id;
			params.body = survey;
			var jar1 = request.jar();
			jar1.setCookie(request.cookie('SESSION_ID=INVALID'), params.url);
			params.jar = jar1;
			request.post(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				expect(res.body).toBe('Bad Auth');
				done();
			});
		});

		it('Should update survey with id', function(done) {
			update.name = 'new';
			update.publish = true;
			params.body = update;
			params.url = api + id;
			request.post(params, function(err, res, body) {
				expect(res.statusCode).toBe(200);
				expect(res.body).toMatch('Successfully Updated');
				done();
			});
		});

		it('Should not update survey with wrong id', function(done) {
			update.name = 'new';
			params.body = update;
			params.url = api + '-1';
			request.post(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				done();
			});
		});

		it('Should not add exceeding name limit', function(done) {
			params.body.name = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m';
			params.url = api + 'add';
			request.post(params, function(err, res, body) {
			expect(res.statusCode).toBe(400);
			expect(res.body).toMatch('Unable to update');
			done();
			}); 
		});

		it('Should not update exceeding statement limit', function(done) {
			var limit = new Array();
			for (i = 0; i <  100; i++) {
				limit.push(i);
			}
			params.body.statements = limit;
			params.url = api + id;
			request.post(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				expect(res.body).toMatch('Unable to update');
				done();
			}); 
		});

		it('Should not update exceeding questionnaire limit', function(done) {
			var limit = new Array();
			for (i = 0; i <  10; i++) {
				limit.push(i);
			}
			params.body.questionnaire = limit;
			params.url = api + id;
			request.post(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				expect(res.body).toMatch('Unable to update');
				done();
			}); 
		});

		it('Should not update exceeding register limit', function(done) {
			var limit = new Array();
			for (i = 0; i <  10; i++) {
				limit.push(i);
			}
			params.body.register = limit;
			params.url = api + id;
			request.post(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				expect(res.body).toMatch('Unable to update');
				done();
			}); 
		});

		it('Should not edit survey with users > 0', function(done) {
			params.body.users = ['user 1'];
			params.body.name = 'change';
			params.url = api + id;
			request.post(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				expect(res.body).toMatch('Unable to update');
				done();
			}); 
		});
	});
});

/** User Route Tests */
describe('User route', function() {
	/** Test /POST Routes */
	describe('/POST', function() {
		var params;
		beforeEach(function(done) {
			params = {
				url: api2,
				headers: headers,
				json: true
			};
			done();
		});

		it('Should add user', function(done) {
			params.url = api2 + id + '/addUser';
			params.body = { register_ans: ['k'] };
			request.post(params, function(err, res, body) {
				expect(res.statusCode).toBe(200);
				uid = res.body;
				done();
			});
		});

		it('Should update user (initial sort)', function(done) {
			params.url = api2 + pid + '/user/' + uid;
			params.body = initialsort;
			request.post(params, function(err, res, body) {
				expect(res.statusCode).toBe(200);
				done();
			});
		});
	});

	/** Test /GET Routes */
	describe('/GET', function() {
		var params;
		beforeEach(function(done) {
			params = {
				url: api2,
				headers: headers,
				jar: j,
				json: true
			};
			done();
		});
			
		it('Should get user from user id', function(done) {
			params.url = api2 + pid + '/user/' + uid;
			request.get(params, function(err, res, body) {
				expect(res.statusCode).toBe(200);
				done();
			});
		});

		it('Should get all user', function(done) {
			params.url = api2 + id + '/users';
			request.get(params, function(err, res, body) {
				expect(res.statusCode).toBe(200);
				done();
			});
		});

		it('Should not get user from bad user id', function(done) {
			params.url = api2 + pid + '/user/-1';
			request.get(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				done();
			});
		});
	});
});

/** Test /DELETE routes */
describe('/DELETE', function() {
	/** User Route */
	describe('Delete user', function() {
		var params;
		beforeEach(function(done) {
			params = {
				url: api2,
				headers: headers,
				jar: j
			};
			done();
		});

		it('should delete with id', function(done) {
			params.url = api2 + pid + '/user/' + uid;
			request.delete(params, function(err, res, body) {
				expect(res.statusCode).toBe(200);
				done();
			});
		});

		it('should not delete with bad id', function(done) {
			params.url = api2 + pid + '/user/-1';
			request.delete(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				done();
			});
		});
	});

	/** Survey Route */
	describe('Delete survey', function() {
		var params;
		beforeEach(function(done) {
			params = {
				url: api + id,
				headers: headers,
				json: true,
				jar: j,
				body: {}
			};
			done();
		});

		it('Should not delete with bad cookie', function(done) {
			var jar1 = request.jar();
			jar1.setCookie(request.cookie('SESSION_ID=INVALID'), params.url);
			params.jar = jar1;
			request.delete(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				expect(res.body).toMatch('Bad Auth');
				done();
			});
		});

		it('Should delete survey with id', function(done) {
			request.delete(params, function(err, res, body) {
				expect(res.statusCode).toBe(200);
				expect(res.body).toMatch('Successfully Removed');
				done();
			});
		});

		it('Should not delete survey with bad id', function(done) {
			params.url = api + '-1';
			request.delete(params, function(err, res, body) {
				expect(res.statusCode).toBe(400);
				done();
			});
		});	
	});

	/** Auth Route */
	describe("Delete cookie", function() {
		var params;
		beforeEach(function(done) {
				params = {
					url: auth + 'remove_token',
					json: true,
					jar: j
				};
				done();
		});

		it('Should be valid token', function(done) {
			request.get(params, function(err, res, body) {
				expect(res.statusCode).toBe(200);
				expect(res.body).toBe('Expired Cookie');
				done();
			});
		});
	});
});