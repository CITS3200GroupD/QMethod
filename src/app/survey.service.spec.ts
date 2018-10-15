import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Survey } from './models';
import { ValidSurveyList } from './testing/Testing';
import { SurveyService } from './survey.service';

describe('SurveyService', () => {

  let service: SurveyService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const uri = 'http://localhost:8080/api';
  const valid_survey_list = ValidSurveyList;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ SurveyService ]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = new SurveyService(httpClient);
  });

  // After every test, check that there are no more pending requests.
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

  it('getSurveys() should return surveys', () => {
    const test_url = `${uri}`;
    const return_val = valid_survey_list;

    // Call function
    service.getSurveys().subscribe(res => {
      expect(res).toEqual(return_val);
    });

    // Simulate the response from express server
    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('GET');
    req.flush(return_val);
  });

  it('getSurvey() should return survey', () => {
    const id = valid_survey_list[0]._id;
    const return_val = valid_survey_list[0];
    const test_url = `${uri}/${id}`;

    // Call function
    service.getSurvey(id).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    // Simulate the response from express server
    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('GET');
    req.flush(return_val);
  });

  it('updateSurvey() should return success', () => {
    const id = valid_survey_list[0]._id;
    const return_val = 'Successfully Updated';
    const test_url = `${uri}/${id}`;

    service.updateSurvey(valid_survey_list[0]).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    // Simulate the response from express server
    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('POST');
    req.flush(return_val);
  });

  it('addSurvey() should return success', () => {
    const name = valid_survey_list[1].name;
    const range = valid_survey_list[1].range;
    const register = valid_survey_list[1].register;
    const statements = valid_survey_list[1].statements;
    const questionnaire = valid_survey_list[1].questionnaire;
    const return_val = 'Successfully Updated';
    const test_url = `${uri}/add`;

    // Call function
    service.addSurvey(name, range,  register, statements, questionnaire).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    // Simulate the response from express server
    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('POST');
    req.flush(return_val);
  });

  it('deleteSurvey() should return success', () => {
    const id = valid_survey_list[0]._id;
    const return_val = 'Successfully Removed';
    const test_url = `${uri}/${id}`;

    // Call function
    service.deleteSurvey(id).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    // Simulate the response from express server
    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(return_val);
  });
});
