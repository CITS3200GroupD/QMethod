import { Injectable } from '@angular/core';           // ng core
import { HttpClient } from '@angular/common/http';    // ng<->express client

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  uri = 'http://localhost:4000/surveys';

  constructor(private http: HttpClient) { }

  addSurvey(survey_name, survey_kurt) {
    const obj = {
      survey_name: survey_name,
      survey_kurt: survey_kurt,
      // TODO: Statement importing - remove this
      statements: [ 'Testing 1', 'Testing 2', 'Testing 3', 'Testing 4', 'Testing 5',
                    'Testing 6', 'Testing 7', 'Testing 8', 'Testing 9', 'Testing 10',
                  'Super long statements should be this length to test if this is a viable or not in the long run.']
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getSurveys() {
    return this
           .http
           .get(`${this.uri}`);
  }

  editSurvey(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
  }

  updateSurvey(survey_name, survey_kurt, id) {

    const obj = {
      survey_name: survey_name,
      survey_kurt: survey_kurt
    };
    this
      .http
      .post(`${this.uri}/update/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteSurvey(id) {
    return this
              .http
              .get(`${this.uri}/delete/${id}`);
  }

  addStatement(id, statement: string) {
    const obj = {
      statement: statement
    };
    return this
              .http
              .post(`${this.uri}/add/s/${id}`, obj);
  }

  deleteStatement(id, statement_id) {
    return this
              .http
              .get(`${this.uri}/delete/${id}/s/${statement_id}`);
  }
}
