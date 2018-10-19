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

  headers: HttpHeaders;

  /**
   * A function to add mock authentication for testing purposes
   * @param auth_key the string to pass as the auth token
   * @deprecated Deprecated as of 0.1.4a
   */
  addAuthHeader(auth_key: string): void {
    this.headers = new HttpHeaders({
      'auth': auth_key,
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
      console.log(value);
      console.log(typeof value);
      // Find default grid
      if ( Number(value) === range) {
        console.log('MATCH!');
        cols = Array.from(item.default_cols);
      }
    });
    console.log(cols);
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
              .post(`${this.uri}/add`, surveyCreate, { headers: this.headers, withCredentials: true });
    }
    return null;
  }

  // Note: API token (JWT) is passed along as a secure cookie for authentication (if exists)
  // this denotes administrator access for full survey list (unscrubbed) data

  getSurveys(): Observable<Object> {
    return this
           .http
           .get(`${this.uri}`, { headers: this.headers, withCredentials: true });
  }

  getSurvey(id: string): Observable<Object> {
    return this
            .http
            .get(`${this.uri}/${id}`, { headers: this.headers, withCredentials: true});
  }

  updateSurvey(survey: Survey): Observable<Object> {
    const id = survey._id;

    return this
              .http
              .post(`${this.uri}/${id}`, survey, { headers: this.headers, withCredentials: true });
  }

  deleteSurvey(id: string): Observable<Object> {
    return this
              .http
              .delete(`${this.uri}/${id}`, { headers: this.headers, withCredentials: true });
  }
}
