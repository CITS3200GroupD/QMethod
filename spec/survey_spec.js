//jasmine-node-karma spec/

var Survey = require('../express/models/Survey');
var request = require('request');
var url = 'http://localhost:8080/api/';
var survey = { cols: [ 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2 ],
    register: [],
    questionnaire: [],
    statements: [],
    name: 'test',
    range: 11,
    publish: false,
    users: []
};
var id;
var update = survey;
var headers = {
    qmd : 'ng-client',
    authorization: true
}

describe("test", function() {
    it('Should not fail', function() {
        expect(true).toBe(true);
    });
});

describe('/GET', function() {
    var params;
    beforeEach(function(done) {
        params = {
            url: url,
            headers: headers
        };
        done();
    });

    it('Should get all survey', function(done) {
        request.get(params, function(err, res, body) {
            expect(res.statusCode).toBe(200);
            update = JSON.parse(body)[0];
            id = JSON.parse(body)[0]._id;
            done();
        });
    });

    it('Should get from id', function(done) {
        params.url = url + id;
        request.get(params, function(err, res, body) {
            expect(res.statusCode).toBe(200);
            expect(JSON.parse(body)).toMatch(update);
            done();
        });
    });

    it('Should not get from wrong id', function(done) {
        params.url = url + '-1';
        request.get(params, function(err, res, body) {
            expect(res.statusCode).toBe(400);
            done();
        });
    });

});

describe('/POST', function() {
    var params = null;
    beforeEach(function(done) {
        params = {
            url: url,
            headers: headers,
            json: true,
            body: {}
        };
        done();
    })

    it('Should not add with bad authorization', function(done) {
        params.url = url + 'add';
        params.headers.authorization = 'false';
        request.post(params, function(err, res, body) {
            expect(res.statusCode).toBe(400);
            expect(res.body).toBe('Bad Auth');
            done();
        });
    });


    it('Should add survey', function(done) {
        params.url = url + 'add';
        params.body = survey;
        request.post(params, function(err, res, body){
            expect(res.statusCode).toBe(200);
            expect(res.body).toMatch('Successfully Updated');
            done();
        });
    });

    it('Should not update with bad authentication', function(done) {
        params.body.name = 'update';
        params.url = url + id;
        params.headers.authorization = false;
        request.post(params, function(err, res, body) {
            expect(res.statusCode).toBe(400);
            expect(res.body).toBe('Bad Auth');
            done();
        });
    });

    it('Should update survey with id', function(done) {
        update.name = 'new';
        params.body = update;
        params.url = url + id;
        request.post(params, function(err, res, body) {
            expect(res.statusCode).toBe(200);
            expect(res.body).toMatch('Successfully Updated');
            done();
        });
    });

    it('Should not update survey with wrong id', function(done) {
        update.name = 'new';
        params.body = update;
        params.url = url + '-1';
        request.post(params, function(err, res, body) {
            expect(res.statusCode).toBe(400);
            done();
        });
    });

    it('Should add statement', function(done) {
        params.body.statement = 'statement 1';
        params.url = url + id + '/addState';
        request.post(params, function(err, res, body) {
            expect(res.statusCode).toBe(200);
            expect(res.body).toMatch('Successfully Added Statement');
            done();
        });
    });

    it('Should not add non-string statement', function(done) {
        params.body.statement = true;
        params.url = url + id + '/addState';
        request.post(params, function(err, res, body) {
            expect(res.statusCode).toBe(400);
            expect(res.body).toMatch('Unable to update');
            done();
        });
    });

    it('Should add statements with 350 characters', function(done) {
        params.body.statement = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate.';
        params.url = url + id + '/addState';
        request.post(params, function(err, res, body) {
            expect(res.statusCode).toBe(200);
            expect(res.body).toMatch('Successfully Added Statement');
            done();
        });
    });

    it('Should not add exceeding name limit', function(done) {
        params.body.name = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m';
        params.url = url + 'add';
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
        params.url = url + id;
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
        params.url = url + id;
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
        params.url = url + id;
        request.post(params, function(err, res, body) {
            expect(res.statusCode).toBe(400);
            expect(res.body).toMatch('Unable to update');
            done();
        });
    });

    it('Should not edit survey with users > 0', function(done) {
        params.body.users = ['user 1'];
        params.body.name = 'change';
        params.url = url + id;
        request.post(params, function(err, res, body) {
            expect(res.statusCode).toBe(400);
            expect(res.body).toMatch('Unable to update');
            done();
        });
    });

    /* check is in edit component
    it('should not edit published survey', function(done) {
        survey.publish = true;
        params.body = survey;
        params.url = url + id;
        request.post(params, function(err, res, body) {
            expect(res.statusCode).toBe(400);
        });
    });*/

});

describe('/DELETE', function() {
    var params;
    beforeEach(function(done) {
        params = {
            url: url + id,
            headers: headers
        };
        done();
    });
    it('Should not delete with bad authorization', function(done) {
        params.headers.authorization = false;
        request.post(params, function(err, res, body) {
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

    /*it('Should delete statement with id', function(done) {
        request.delete({url: url + id + '/delState/' + stateId, headers: headers}, function(err, res, body) {
            expect(res.statusCode).toBe(200);
            done();
        });
    });*/
})
