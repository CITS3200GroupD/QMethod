import { isDevMode, Injectable } from '@angular/core';           // ng core
import { HttpClient, HttpHeaders } from '@angular/common/http';               // ng<->express client
import { User, Survey, SurveyInput } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri: String;
  headers = new HttpHeaders();

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

  /**
   * Constructor for the UserService
   * @param http @ng HttpClient
   */
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({
      'qmd': 'ng-client'
    });
    if (isDevMode()) {
      this.uri = 'http://localhost:8080/api2';   // For local testing
    } else {
      this.uri = '/api2';      // Production/Deployment
    }
  }

  /*
   * User RESTful API Middleware
   * ============================================================================
   * See https://qmethod.gitbook.io/project/documentation/user-api
   * ============================================================================
   * Note: API token (JWT) is passed along as a secure cookie for authentication (if exists)
   * this denotes administrator access for routes which handle sensitive data.
   */

  /**
   * Calls the express server, for a given survey (by ID), return an array of all user data.
   * This route requires authentication credentials (JWT token) to be passed.
   * @param survey_id ID corresponding to the survey to pull user data from
   * @returns Observable with array of user data
   */
  getAllUsers(survey_id: string): Observable<Object> {
    return this
              .http
              .get(`${this.uri}/${survey_id}/users`, { headers: this.headers, withCredentials: true });
  }

  /**
   * Calls the express server, for a given survey (by ID), add a user to this survey
   * This route requires authentication credentials (JWT token) to be passed.
   * @param survey_id ID corresponding to the survey to append user data to
   * @returns Observable with success or invalid respond
   */
  addUser(survey_id: string, registration_info: string[]): Observable<Object>  {
    const userCreate = {
      register_ans: registration_info,
    };

    return this
              .http
              .post(`${this.uri}/${survey_id}/addUser`, userCreate, { headers: this.headers, withCredentials: true });
  }

  /**
   * Calls the express server, for a given survey (by ID), get the user data for a specific user
   * This route is public and does not require authentication.
   * @param survey_id ID corresponding to the survey to pull user data from
   * @returns Observable with success or invalid respond
   */
  getUser(survey_id: string, user_id: string): Observable<Object>  {
    return this
              .http
              .get(`${this.uri}/${survey_id}/user/${user_id}`, { headers: this.headers, withCredentials: true });
  }

  /**
   * Calls the express server, for a given survey (by ID), update an existing user of this survey
   * This route is public and does not require authentication,
   * but has strict checking of inputs (versus user's progres) to ensure data correctness.
   * @param survey_id ID corresponding to the survey
   * @param user_id ID corresponding to the user data to be modified
   * @returns Observable with success or invalid respond
   */
  updateUser(survey_id: string, user_id: string, input: any): Observable<Object>  {
    return this
              .http
              .post(`${this.uri}/${survey_id}/user/${user_id}`, input, {headers: this.headers, withCredentials: true });
  }

  /**
   * Calls the express server,  for a given survey (by ID), delete an existing user from this survey
   * This route requires authentication credentials (JWT token) to be passed.
   * @param survey_id ID corresponding to the survey
   * @param user_id ID corresponding to the user data to be modified
   * @returns Observable with success or invalid respond
   */
  deleteUser(survey_id: string, user_id: string): Observable<Object> {
    return this
              .http
              .delete(`${this.uri}/${survey_id}/user/${user_id}`, {headers: this.headers, withCredentials: true });
  }
}
