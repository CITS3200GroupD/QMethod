import { Component, OnInit, isDevMode } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../survey.service';           // QMd Survey Service MW
import { UserService } from '../../user.service';               // QMd User Service MW
import { Survey } from '../../models';
import { WindowWrap } from '../../window-wrapper';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  TEMP_response = [ '20', 'Australian', 'Male', 'English', 'Chinese' ];
  TEMP_registration_fields = ['Age', 'Gender', 'Nationality', 'Main Spoken Language', 'Other Languages'];
  survey_id: string;
  user_id: string;
  id: string;
  registration_fields: string[] = [];

  constructor( private route: ActivatedRoute,
    private router: Router,
    private surveyservice: SurveyService,
    private userservice: UserService,
    private window: WindowWrap) {
      this.route.params.subscribe( params => {
        this.survey_id = params['id'];
      });
    }

  addUser(registration_info) {
    this.route.params.subscribe(params => {
      this.userservice.addUser(params['id'], registration_info).subscribe(
        (res: string) => {
          this.user_id = res;
          // TODO: Modal or element to display user_id to user
          if (this.window.nativeWindow.confirm(`${this.user_id}`)) {}
          this.router.navigate(['initial-sort', this.survey_id],
            {
              skipLocationChange: !isDevMode(),
              queryParams: {
                user_id: this.user_id
              }
            });
        }
      );
    });
  }

   // Get data from survey service
   getRegistrationFields() {
    this.surveyservice.getSurvey(this.id).subscribe( (res: Survey) => {
      this.registration_fields = res.register;
    });
  }

  ngOnInit() {
  }

}
