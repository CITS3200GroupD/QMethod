import { Injectable } from '@angular/core';           // ng core
import { HttpClient } from '@angular/common/http';               // ng<->express client
import { User } from '../models';
import { ValidSurveyList, ValidUserList } from './Testing';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockUserService {

  private valid_survey_list = ValidSurveyList;
  private valid_user_list = ValidUserList;

  constructor(private http: HttpClient) {
  }

  // TODO: Implement functions and write documentation in
  // https://qmethod.gitbook.io/project/documentation/user-api
  // See user.service.spec.ts for unit tests

  getAllUsers(survey_id: string): Observable<Object> {
    return of(this.valid_user_list);
  }

  addUser(survey_id: string, registration_info: any): Observable<Object>  {
    return of( 'Successfully Updated');
  }

  getUser(survey_id: string, user_id: string): Observable<Object>  {
    let return_val = of(null);
    this.valid_user_list.forEach( (item) => {
      if (item._id == user_id) {
        console.log(item);
        return_val = of(item);
      }
    });
    return return_val;
  }

  updateUser(survey_id: string, user: User): Observable<Object>  {
    let id = survey_id;
    let continue_flag = false;
    let return_val = of(undefined);
    this.valid_survey_list.forEach( (item) => {
      if (item._id == id) {
        continue_flag = true;
      }
    });
    if (continue_flag) {
      id = user._id;
      this.valid_user_list.forEach( (item) => {
        if (item._id == id) {
          return_val = of('Successfully Updated');
        }
      });
    }
    return return_val;
  }

  deleteUser(survey_id: string, user_id: string): Observable<Object>  {
    let id = survey_id;
    let continue_flag = false;
    let return_val = of(undefined);
    this.valid_survey_list.forEach( (item) => {
      if (item._id == id) {
        continue_flag = true;
      }
    });
    if (continue_flag) {
      this.valid_user_list.forEach( (item) => {
        if (item._id == user_id) {
          return_val = of('Successfully Updated');
        }
      });
    }
    return return_val;
  }
}
