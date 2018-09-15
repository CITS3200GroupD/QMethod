import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Survey, User } from './Survey';
import { UserService } from './user.service';

describe('UserService', () => {

  let service: UserService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const uri = 'http://localhost:8080/api'
  const valid_survey_list: Survey[] = [{
    _id: '0131asfd3',
    publish: true,
    name: "testing1",
    range:  7,
    cols: [2, 3, 4, 5, 4, 3, 2],
    statements: [
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '' ,'', '', '', '', '',
      '', '', ''
    ],
    users: [
      {
        _id: '12312asdfsdfa',
        register: {
          age: '20',
          gender: 'Male',
          main_lang: 'Any Language',
          other_lang: 'Any Languages'
        },
        progress: 0,
        questions_ans: ['', '', '', '', ''],
        sort_agree: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        sort_neutral: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        sort_disagree: [19, 20, 21, 22],
        matrix: [
          [0, 1],
          [1, 2, 3,],
          [4, 5, 6, 7],
          [8, 9, 10, 11, 12],
          [13, 14, 15, 16],
          [17, 18, 19],
          [21, 22]
        ]
      },
      {
        _id: 'asdasdasdsad',
        register: {
          age: '20',
          gender: 'Male',
          main_lang: 'Any Language',
          other_lang: 'Any Languages'
        },
        progress: 0,
        questions_ans: ['', '', '', '', ''],
        sort_agree: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        sort_neutral: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        sort_disagree: [19, 20, 21, 22],
        matrix: [
          [0, 1],
          [1, 2, 3,],
          [4, 5, 6, 7],
          [8, 9, 10, 11, 12],
          [13, 14, 15, 16],
          [17, 18, 19],
          [21, 22]
        ]
      }
    ]
  },
  {
    _id: '0234asd5',
    publish: true,
    name: "testing2",
    range:  9,
    cols: [2, 3, 4, 5, 6, 5, 4, 3, 2],
    statements:  [
      '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '' ,'', '', '', '', '',
      '', '', '', '', '' ,'', '', '', '', '',
      '', '', '', ''
    ],
    users: []
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = new UserService(httpClient);
  });

  // After every test, assert that there are no more pending requests.
  afterEach(() => {
    httpTestingController.verify();
  });

  // Testing httpclient
  it('Test HttpClient.get', () => {
    const test_url = `${uri}/test`;
    // Make an HTTP GET request
    httpClient.get<Survey[]>(test_url)
      .subscribe(res => {
          // When observable resolves, result should match test data
          expect(res).toEqual(valid_survey_list);
        }
      );

    const req = httpTestingController.expectOne(test_url);
    expect(req.request.method).toEqual('GET');
    req.flush(valid_survey_list);
  });

  // Tests

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('getAllUsers() should return success', () => {
    const survey_id = valid_survey_list[0]._id;
    const return_val = valid_survey_list[0].users;
    const test_url = `${uri}/${survey_id}/users`;

    service.getAllUsers(survey_id).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('GET');
    req.flush(return_val);
  });

  it('addUser() should return success', () => {
    const survey_id = valid_survey_list[1]._id;
    const return_val = 'Successfully Updated';
    const test_url = `${uri}/${survey_id}/addUser`;
    const registration_info = { age: '21', gender: 'Male', main_lang: 'Main Lang', other_lang: 'other'};

    service.addUser(survey_id, registration_info).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('POST');
    req.flush(return_val);
  });

  it('getUser() should return User', () => {
    const survey_id = valid_survey_list[0]._id;
    const user_id = valid_survey_list[0].users[0]._id;
    const return_val = valid_survey_list[0].users[0];
    const test_url = `${uri}/${survey_id}/user/${user_id}`;

    service.getUser(survey_id, user_id).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('GET');
    req.flush(return_val);
  });

  it('updateUser() should return success', () => {
    const survey_id = valid_survey_list[0]._id;
    const user = valid_survey_list[0].users[0];
    const return_val = 'Successfully Updated';
    const test_url = `${uri}/${survey_id}/user/${user._id}`;

    service.updateUser(survey_id, user).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('POST');
    req.flush(return_val);
  });

  it('deleteUser() should return success', () => {
    const survey_id = valid_survey_list[0]._id;
    const user_id = valid_survey_list[0].users[0]._id;
    const return_val = 'Successfully Removed';
    const test_url = `${uri}/${survey_id}/user/${user_id}`;

    service.deleteUser(survey_id, user_id).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(return_val);
  });
});
