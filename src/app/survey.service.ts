import { isDevMode, Injectable } from '@angular/core';           // ng core
import { HttpClient } from '@angular/common/http';    // ng<->express client
import { gridTemplates } from './Survey';

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

  gridTemplates = gridTemplates;
  uri: String;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.uri = 'http://localhost:8080/api';   // For local testing
    } else {
      this.uri = '/api';      // Production/Deployment
    }
  }

  addSurvey(name, range, statements) {
    let cols;
    this.gridTemplates.forEach( (item) => {
      const value = item.val;
      // Find default grid
      if (Number(value) == range) {
        cols = Array.from(item.defaultGrid);
      }
    });
    if (cols) {
      const obj = {
        name: name,
        range: range,
        cols: cols,
        publish: false,
        statements: statements,
        users: []
      };
      this.http.post(`${this.uri}/add`, obj);
    }
  }

  // TODO: Pass private api key along with data for authentication (if exists) as administrator for full survey list access
  getSurveys() {
    return this
           .http
           .get(`${this.uri}`);
  }

  getSurvey(id) {
    return this
            .http
            .get(`${this.uri}/${id}`);
  }

  updateSurvey(name, range, cols, publish, users, id) {

    const obj = {
      name: name,
      range: range,
      cols: cols,
      publish: publish,
      users: users
    };
    return this
              .http
              .post(`${this.uri}/${id}`, obj);
  }

  deleteSurvey(id) {
    return this
              .http
              .delete(`${this.uri}/${id}`);
  }

  addStatement(id, statement: string) {
    const obj = {
      statement: statement
    };
    return this
              .http
              .post(`${this.uri}/${id}/addState`, obj);
  }

  deleteStatement(id, statement_id) {
    return this
              .http
              .delete(`${this.uri}/${id}/delState/${statement_id}`);
  }
}
