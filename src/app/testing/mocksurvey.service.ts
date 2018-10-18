import { isDevMode, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey, SurveyInput, GridTemplates } from '../models';
import { ValidSurveyList } from './Testing';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/***
 * Survey RESTful API Middleware
 * ============================================================================
 * See https://qmethod.gitbook.io/project/documentation/survey-api
 * ============================================================================
 */

export class MockSurveyService {

  private cols_templates = GridTemplates;
  private valid_survey_list = ValidSurveyList;

  constructor(private http: HttpClient) {}

  addAuthHeader(auth_key: string): void {}

  addSurvey(name: string, range: number, register: string[],
    statements: string[], questionnaire: string[]): Observable<Object> {
    console.log('Received message');
    const return_val = 'Successfully Updated';
    return of(return_val);
  }

  getSurveys(): Observable<Object> {
    const return_val = this.valid_survey_list;
    return of(return_val);
  }

  getSurvey(id: string): Observable<Object> {
    console.log('Received message');
    let return_val = of(undefined);
    this.valid_survey_list.forEach( (item) => {
      if (item._id === id) {
        return_val = of(item);
      }
    });
    return return_val;
  }

  updateSurvey(survey: Survey): Observable<Object> {
    console.log('Received message');
    const id = survey._id;
    let return_val = of(undefined);
    this.valid_survey_list.forEach( (item) => {
      if (item._id === id) {
        return_val = of('Successfully Updated');
      }
    });
    return return_val;
  }

  deleteSurvey(id: string): Observable<Object> {
    console.log('Received message');
    let return_val = of(undefined);
    this.valid_survey_list.forEach( (item) => {
      if (item._id === id) {
        return_val = of('Successfully Updated');
      }
    });
    return return_val;
  }
}
