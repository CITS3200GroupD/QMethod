import { isDevMode, Injectable } from '@angular/core';           // ng core
import { HttpClient } from '@angular/common/http';    // ng<->express client
import { Survey, SurveyInput, GridTemplates } from './Survey';

@Injectable({
  providedIn: 'root'
})

/***
 * Survey RESTful API Middleware
 * ============================================================================
 * See https://qmethod.gitbook.io/project/documentation/survey-api
 * ============================================================================
 */

export class SurveyService {

  cols_templates = GridTemplates;
  uri: String;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.uri = 'http://localhost:8080/api';   // For local testing
    } else {
      this.uri = '/api';      // Production/Deployment
    }
  }

  addSurvey(name: string, range: number, statements: string[]) {
    let cols: number[];
    this.cols_templates.forEach( (item) => {
      const value = item.val;
      // Find default grid
      if (Number(value) == range) {
        cols = Array.from(item.default_cols);
      }
    });
    if (cols) {
      const surveyCreate: SurveyInput = {
        name: name,
        range: range,
        cols: cols,
        publish: false,
        statements: statements,
        users: []
      };
      return this.http.post(`${this.uri}/add`, surveyCreate);
    }
    return null;
  }

  // TODO: Pass private api key along with data for authentication (if exists) as administrator for full survey list access
  getSurveys() {
    return this
           .http
           .get(`${this.uri}`);
  }

  getSurvey(id: string) {
    return this
            .http
            .get(`${this.uri}/${id}`);
  }

  updateSurvey(survey: Survey) {
    const id = survey._id;

    return this
              .http
              .post(`${this.uri}/${id}`, survey);
  }

  deleteSurvey(id: string) {
    return this
              .http
              .delete(`${this.uri}/${id}`);
  }

  addStatement(id: string, statement: string) {
    const obj = {
      statement: statement
    };
    return this
              .http
              .post(`${this.uri}/${id}/addState`, obj);
  }

  deleteStatement(id: string, statement_id: number) {
    return this
              .http
              .delete(`${this.uri}/${id}/delState/${statement_id}`);
  }
}
