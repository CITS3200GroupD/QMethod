import { isDevMode, Injectable } from '@angular/core';           // ng core
import { HttpClient, HttpHeaders } from '@angular/common/http';    // ng<->express client
import { Survey, SurveyInput, GridTemplates } from './models';
import { Observable } from 'rxjs';

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

  private cols_templates = GridTemplates;
  private uri: string;

  // TODO: Replace placeholder header with real Authorisation Header
  headers: HttpHeaders;

  // To be depreciated
  addAuthHeader(auth_key: string): void {
    this.headers = new HttpHeaders({
      'authorization': auth_key,
      'qmd': 'ng-client'
    });
  }

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'qmd': 'ng-client'
    });
    if (isDevMode()) {
      this.uri = 'http://localhost:8080/api';   // For local testing
    } else {
      this.uri = '/api';      // Production/Deployment
    }
  }

  addSurvey(name: string, range: number, register: string[],
    statements: string[], questionnaire: string[]): Observable<Object> {
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
        register: register,
        questionnaire: questionnaire,
        users: []
      };
      return this
              .http
              .post(`${this.uri}/add`, surveyCreate, { headers: this.headers });
    }
    return null;
  }

  // TODO: Pass private api key along with data for authentication (if exists) as administrator for full survey list access
  getSurveys(): Observable<Object> {
    return this
           .http
           .get(`${this.uri}`, { headers: this.headers });
  }

  getSurvey(id: string): Observable<Object> {
    return this
            .http
            .get(`${this.uri}/${id}`, { headers: this.headers });
  }

  updateSurvey(survey: Survey): Observable<Object> {
    const id = survey._id;

    return this
              .http
              .post(`${this.uri}/${id}`, survey, { headers: this.headers });
  }

  deleteSurvey(id: string): Observable<Object> {
    return this
              .http
              .delete(`${this.uri}/${id}`, { headers: this.headers });
  }

  addStatement(id: string, statement: string): Observable<Object> {
    const obj = {
      statement: statement
    };
    return this
              .http
              .post(`${this.uri}/${id}/addState`, obj, { headers: this.headers });
  }

  deleteStatement(id: string, statement_id: number): Observable<Object> {
    return this
              .http
              .delete(`${this.uri}/${id}/delState/${statement_id}`, { headers: this.headers });
  }
}
