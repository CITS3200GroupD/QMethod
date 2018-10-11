import { Component, OnInit, isDevMode } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { SurveyService } from 'src/app/survey.service';
import { WindowWrap } from '../../window-wrapper';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Survey } from 'src/app/models';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  survey_id: string;
  user_id: string;
  reg_fg: FormGroup;
  reg_fa: FormArray;

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

  private getSurveyData(): void {
    this.surveyservice.getSurvey(this.survey_id).subscribe(
      (res: Survey) => {
        // Using questionnaire field array as a reference, loop through and init new field objects to the form array
        res.questionnaire.forEach((field) => {
          this.reg_fa.push(this.createField(field));
        });
        this.getUserData();
      },
      err => {
        console.error(err);
        // TODO: Error Message Prompt for UX
      }
    );
  }

  /** @ng reactive forms init */
  private createForm(): void {
    this.reg_fg = this.fb.group({
      fields: this.fb.array([])
    });
    this.reg_fa = this.reg_fg.get('fields') as FormArray;
  }

  /** @ng reaction form array init */
  private createField(field: string): FormGroup {
    return this.fb.group({
      question: field,
      answer: ['', Validators.required]
    });
  }

  // Get data from user service
  private getUserData() {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
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
   * Function called when submit questionnaire.
   * Submits the collated data
   * If successful, goes to submission page.
   */
  continueToResults() {
    const ans = this.getResponse();
    const input = {
        question_ans: ans
    };
    if (ans) {
      this.userservice.updateUser(this.survey_id, this.user_id, input).subscribe( res => {
        this.router.navigate(['submission', this.survey_id], {
          queryParams: {
            user_id: this.user_id
          }
        });
      },
      err => {
        console.error(err);
      });
    }
  }

  ngOnInit(): void {
  }

}
