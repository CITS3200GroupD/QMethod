import { isDevMode, Injectable } from '@angular/core';           // ng core
import { HttpClient, HttpHeaders } from '@angular/common/http';    // ng<->express client
import { Survey, SurveyInput, GridTemplates } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*
 * Survey RESTful API Middleware
 * ============================================================================
 * See https://qmethod.gitbook.io/project/documentation/survey-api
 * ============================================================================
 * Note: API token (JWT) is passed along as a secure cookie for authentication (if exists)
 * this denotes administrator access for routes which handle sensitive data.
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

  /** Constructor for SurveyService
   * @param http @ng HttpClient
  */
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

  /**
   * Sends a request to the express server to generate a new survey
   * This route requires authentication credentials (JWT token) to be passed.
   * @param name Name of the survey
   * @param range Range of the survey (7 = +3 to -3, 9 = +4 to -4, etc)
   * @param instructions Array of instructions
   * @param register Array of registration page fields
   * @param statements Array of Statement fields
   * @param questionnaire Array of Questionnaire fields
   */
  addSurvey(name: string, range: number, instructions: string[], register: string[],
    statements: string[], questionnaire: string[]): Observable<Object> {
    let cols: number[];
    this.cols_templates.forEach( (item) => {
      const value = item.val;
      /* DEBUG
       * console.log(value);
       * console.log(typeof value);
       */
      // Find default grid
      if ( Number(value) === range) {
        // DEBUG
        // console.log('MATCH!');
        cols = Array.from(item.default_cols);
      }
    });
    // DEBUG
    // console.log(cols);
    if (cols) {
      const surveyCreate: SurveyInput = {
        name: name,
        range: range,
        cols: cols,
        publish: false,
        statements: statements,
        register: register,
        questionnaire: questionnaire,
        instructions: instructions,
        users: []
      };
      return this
              .http
              .post(`${this.uri}/add`, surveyCreate, { headers: this.headers, withCredentials: true });
    }
    return null;
  }

  /** Calls the express server to get a list of all surveys
   * This route requires authentication credentials (JWT token) to be passed.
   * @returns Observable containing the array of survey data
  */
  getSurveys(): Observable<Object> {
    return this
           .http
           .get(`${this.uri}`, { headers: this.headers, withCredentials: true });
  }

  /**
   * Calls the express server for the survey data for a specific survey ID
   * This route is public and does not require authentication.
   * @param id The id of the survey data to be returned
   * @returns Observable containing the survey data
   */
  getSurvey(id: string): Observable<Object> {
    return this
            .http
            .get(`${this.uri}/${id}`, { headers: this.headers, withCredentials: true});
  }

  /**
   * Calls the express server to update survey data of a specific survey ID
   * This route requires authentication credentials (JWT token) to be passed.
   * @param id The id of the survey data to be updated
   * @returns Observable containing either a successful or invalid response
   */
  updateSurvey(survey: Survey): Observable<Object> {
    const id = survey._id;

    return this
              .http
              .post(`${this.uri}/${id}`, survey, { headers: this.headers, withCredentials: true });
  }

  /**
   * Calls the express server to delete survey data that corresponds to a specific survey ID
   * This route requires authentication credentials (JWT token) to be passed.
   * @param id The id of the survey data to be deleted
   * @returns Observable containing either a successful or invalid response
   */
  deleteSurvey(id: string): Observable<Object> {
    return this
              .http
              .delete(`${this.uri}/${id}`, { headers: this.headers, withCredentials: true });
  }
}
