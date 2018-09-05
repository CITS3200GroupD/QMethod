import { Injectable } from '@angular/core';           // ng core
import { HttpClient } from '@angular/common/http';    // ng<->express client
import { Survey } from './components/index/Survey';   // Survey.ts from index


@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  uri = 'http://localhost:4000/surveys';

  constructor(private http: HttpClient) { }

  addSurvey(survey_name, survey_kurt) {
    const obj = {
      survey_name: survey_name,
      survey_kurt: survey_kurt
    };
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
}
