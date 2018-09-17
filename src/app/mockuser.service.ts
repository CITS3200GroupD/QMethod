import { isDevMode, Injectable } from '@angular/core';           // ng core
import { HttpClient } from '@angular/common/http';               // ng<->express client
import { User, Survey, SurveyInput } from './Survey';
import { ValidSurveyList } from './Testing';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockUserService {

  uri: String;
  private test_users_list = ValidSurveyList[0].users;

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.uri = 'http://localhost:8080/api';   // For local testing
    } else {
      this.uri = '/api';      // Production/Deployment
    }
  }

  // TODO: Implement functions and write documentation in
  // https://qmethod.gitbook.io/project/documentation/user-api
  // See user.service.spec.ts for unit tests

  getAllUsers(survey_id: string): Observable<Object> {
    return of(this.test_users_list);
  }

  addUser(survey_id: string, registration_info: any): Observable<Object>  {
    return of( 'Successfully Updated');
  }

  getUser(survey_id: string, user_id: string): Observable<Object>  {
    this.test_users_list.forEach( (item) => {
      if (item._id == user_id) {
        return of(item);
      }
    });
    return of(null);
  }

  updateUser(survey_id: string, user: User): Observable<Object>  {
    return of( 'Successfully Updated');
  }

  deleteUser(survey_id: string, user_id: string): Observable<Object>  {
    return of( 'Successfully Removed');
  }
}
