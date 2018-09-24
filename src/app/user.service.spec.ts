import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Survey, User } from './models';
import { ValidSurveyList } from './testing/Testing';
import { UserService } from './user.service';

describe('UserService', () => {

  let service: UserService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const uri = 'http://localhost:8080/api2';
  const valid_survey_list: Survey[] = ValidSurveyList;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = new UserService(httpClient);
  });

  // After every test check that there are no more pending requests.
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

  // Tests begin
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllUsers() should return success', () => {
    const survey_id = valid_survey_list[0]._id;
    const return_val = valid_survey_list[0].users;
    const test_url = `${uri}/${survey_id}/users`;

    // Call function
    service.getAllUsers(survey_id).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    // Simulate the response from express server
    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('GET');
    req.flush(return_val);
  });

  it('addUser() should return success', () => {
    const survey_id = valid_survey_list[1]._id;
    const return_val = 'Successfully Updated';
    const test_url = `${uri}/${survey_id}/addUser`;
    const registration_info = ['21', 'Australia', 'Male', 'Main Lang', 'other'];

    // Call function
    service.addUser(survey_id, registration_info).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    // Simulate the response from express server
    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('POST');
    req.flush(return_val);
  });

  it('getUser() should return User', () => {
    const survey_id = valid_survey_list[0]._id;
    const user_id = valid_survey_list[0].users[0]._id;
    const return_val = valid_survey_list[0].users[0];
    const test_url = `${uri}/${survey_id}/user/${user_id}`;

    // Call function
    service.getUser(survey_id, user_id).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    // Simulate the response from express server
    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('GET');
    req.flush(return_val);
  });

  it('updateUser() should return success', () => {
    const survey_id = valid_survey_list[0]._id;
    const user = valid_survey_list[0].users[0];
    const return_val = 'Successfully Updated';
    const test_url = `${uri}/${survey_id}/user/${user._id}`;

    // Call function
    service.updateUser(survey_id, user._id , user).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    // Simulate the response from express server
    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('POST');
    req.flush(return_val);
  });

  it('deleteUser() should return success', () => {
    const survey_id = valid_survey_list[0]._id;
    const user_id = valid_survey_list[0].users[0]._id;
    const return_val = 'Successfully Removed';
    const test_url = `${uri}/${survey_id}/user/${user_id}`;

    // Call function
    service.deleteUser(survey_id, user_id).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    // Simulate the response from express server
    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(return_val);
  });
});
