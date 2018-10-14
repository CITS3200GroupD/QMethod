import { Component, OnInit, isDevMode } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { SurveyService } from 'src/app/survey.service';
import { WindowWrap } from '../../window-wrapper';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Survey } from 'src/app/models';
import * as Settings from '../../../../config/Settings';                // QMd Settings

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  TEMP_REG_FIELD_CHAR_LIMIT = Settings.TEMP_REG_FIELD_CHAR_LIMIT || 100;

  survey_id: string;
  user_id: string;
  reg_fg: FormGroup;
  reg_fa: FormArray;

  /** SubmitOnce flag */
  submitOnce = false;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private surveyservice: SurveyService,
    private userservice: UserService,
    private window: WindowWrap) {
      this.route.params.subscribe( params => {
        this.survey_id = params['id'];
      });
      this.getSurveyData();
      this.createForm();
    }

  /**
   * Get data from survey service
   */
  private getSurveyData(): void {
    this.surveyservice.getSurvey(this.survey_id).subscribe(
      (res: Survey) => {
        // Using registration field array as a reference, loop through and init new field objects to the form array
        res.register.forEach((field) => {
          this.reg_fa.push(this.createField(field));
        });
      },
      err => {
        console.error(err);
        if (this.window.nativeWindow.confirm('Invalid Survey')) {}
        // TODO: Redirect
      }
    );
  }

  /** @ng reactive forms init */
  private createForm(): void {
    this.reg_fg = this.fb.group({
      fields: this.fb.array([])
    });
    console.log(this.reg_fg);
    this.reg_fa = this.reg_fg.get('fields') as FormArray;
  }

  /** @ng reaction form array init */
  private createField(field: string): FormGroup {
    return this.fb.group({
      question: field,
      answer: ['', Validators.required]
    });
  }

  /**
   * A function to extract the necessary information needed to pass onto the user service
   */
  private getResponse(): string[] {
    const return_array = [];
    let invalid = false;
    this.reg_fa.value.forEach( (object) => {
      if (object.answer === '') {
        invalid = true;
      } else {
        return_array.push(object.answer);
      }
    });
    return (invalid ? null : return_array);
  }

  /**
   * A function to submit the registration information and create a new user.
   */
  addUser(): void {
    // Call getResponse
    const registration_info = this.getResponse();
    if (registration_info) {
      this.route.params.subscribe(params => {
        this.userservice.addUser(params['id'], registration_info).subscribe(
          (res: string) => {
            this.user_id = res;
            // TODO: Modal or element to display user_id to user
            if (this.window.nativeWindow.confirm(`Your User ID is [ ${this.user_id} ] and Survey ID is [ ${this.survey_id} ].
            Please record this for future reference.`)) {}
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
    } else {
      // TODO: Display Error to User
      console.error('Invalid Response');
      this.window.nativeWindow.confirm('Invalid Submission');
    }
  }

  ngOnInit(): void {
  }

}
