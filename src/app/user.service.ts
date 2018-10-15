import { isDevMode, Injectable } from '@angular/core';           // ng core
import { HttpClient, HttpHeaders } from '@angular/common/http';               // ng<->express client
import { User, Survey, SurveyInput } from './models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri: String;
  // TODO: Replace placeholder header with real Authorisation Header
  headers = new HttpHeaders();

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
      this.uri = 'http://localhost:8080/api2';   // For local testing
    } else {
      this.uri = '/api2';      // Production/Deployment
    }
  }

  // TODO: Implement functions and write documentation in
  // https://qmethod.gitbook.io/project/documentation/user-api
  // See user.service.spec.ts for unit tests

  getAllUsers(survey_id: string): Observable<Object> {
    return this
              .http
              .get(`${this.uri}/${survey_id}/users`, { headers: this.headers, withCredentials: true });
  }

  addUser(survey_id: string, registration_info: string[]): Observable<Object>  {
    const userCreate = {
      register_ans: registration_info,
    };

    return this
              .http
              .post(`${this.uri}/${survey_id}/addUser`, userCreate, { headers: this.headers, withCredentials: true });
  }

  getUser(survey_id: string, user_id: string): Observable<Object>  {
    return this
              .http
              .get(`${this.uri}/${survey_id}/user/${user_id}`, { headers: this.headers, withCredentials: true });
  }

  updateUser(survey_id: string, user_id: string, input: any): Observable<Object>  {
    return this
              .http
              .post(`${this.uri}/${survey_id}/user/${user_id}`, input, {headers: this.headers, withCredentials: true });
  }

  deleteUser(survey_id: string, user_id: string): Observable<Object> {
    return this
              .http
              .delete(`${this.uri}/${survey_id}/user/${user_id}`, {headers: this.headers, withCredentials: true });
  }
}
