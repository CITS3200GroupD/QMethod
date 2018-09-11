import {  isDevMode, Injectable } from '@angular/core';           // ng core
import { HttpClient } from '@angular/common/http';    // ng<->express client

@Injectable({
  providedIn: 'root'
})

/***
 * Survey RESTful API
 * ============================================================================
 * <url>/api/
 * GET  | getSurveys()            | respond with json of all surveys
 * ============================================================================
 * <url>/api/ add/
 * POST = addSurvey(n, k)         | create a new survey item in database
 * ============================================================================
 * <url>/api/ :id
 * GET  = editSurvey(id)          | respond with survey item corresponding to id
 * POST = updateSurvey(n, k, id)  | update survey item corresponding to id
 * DEL  = deleteSurvey(id)        | remove survey item corresponding to id
 * ============================================================================
 * <url>/api/ addState/:id
 * POST = addStatement(id, s)     | append new statement to survey item s array
 * <url>/api/ delState/ :id/:s_id
 * DEL = deleteStatement(id, s_id)| delete statement corresponding to s_id in survey id
 * ============================================================================
 */

export class SurveyService {

  uri: String;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.uri = 'http://localhost:8080/api';   // For local testing
    } else {
      this.uri = '/api';      // Production/Deployment
    }
  }

  addSurvey(name, range, statements) {
    const obj = {
      name: name,
      range: range,
      cols: [],
      publish: false,
      statements: statements
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
            // .get(`${this.uri}/edit/${id}`);
            .get(`${this.uri}/${id}`);
  }

  updateSurvey(name, range, cols, publish, id) {

    const obj = {
      name: name,
      cols: cols,
      range: range,
      publish: publish,
    };
    this
      .http
      // .post(`${this.uri}/update/${id}`, obj)
      .post(`${this.uri}/${id}`, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteSurvey(id) {
    return this
              .http
              // .get(`${this.uri}/delete/${id}`);
              .delete(`${this.uri}/${id}`);
  }

  addStatement(id, statement: string) {
    const obj = {
      statement: statement
    };
    return this
              .http
              // .post(`${this.uri}/add/s/${id}`, obj);
              .post(`${this.uri}/addState/${id}`, obj);
  }

  deleteStatement(id, statement_id) {
    return this
              .http
              .delete(`${this.uri}/delState/${id}/${statement_id}`);
              // .get(`${this.uri}/delete/${id}/s/${statement_id}`);
  }
}
