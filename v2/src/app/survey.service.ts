import { isDevMode, Injectable } from '@angular/core';           // ng core
import { HttpClient } from '@angular/common/http';    // ng<->express client
import { gridTemplates } from './Survey';

@Injectable({
  providedIn: 'root'
})

/***
 * Survey RESTful API
 * ============================================================================
 * <url>/api/
 * GET  = getSurveys()            | respond with json of all surveys
 * ============================================================================
 * <url>/api/ add/
 * POST = addSurvey(n, r)         | create a new survey item in database
 * ============================================================================
 * <url>/api/ :id
 * GET  = getSurvey(id)           | respond with public survey item corresponding to id
 * POST = updateSurvey( ... , id) | update survey item corresponding to id
 * DEL  = deleteSurvey(id)        | remove survey item corresponding to id
 * ============================================================================
 * <url>/api/ addState/:id
 * POST = addStatement(id, s)     | append new statement to survey item s array
 * <url>/api/ delState/ :id/:s_id
 * DEL = deleteStatement(id, s_id)| delete statement corresponding to s_id in survey id
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
      this.http.post(`${this.uri}/add`, obj)
          .subscribe(res => console.log('Done'));
    }
  }

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
    this
      .http
      .post(`${this.uri}/${id}`, obj)
      .subscribe(res => console.log('Done'));
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
