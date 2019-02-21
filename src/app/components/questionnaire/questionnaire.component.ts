import { Component, OnInit, isDevMode } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { SurveyService } from 'src/app/survey.service';
import { WindowWrap } from 'src/app/window-wrapper';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Survey, User } from 'src/app/models';
import * as Settings from 'config/Settings';                // QMd Settings

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  TEMP_Q_FIELD_CHAR_LIMIT = Settings.TEMP_Q_FIELD_CHAR_LIMIT || 500;

  survey_id: string;
  user_id: string;
  ques_fg: FormGroup;
  ques_fa: FormArray;
  progress: number;

  instructions: string[] = [];
  statements: string[] = [];
  matrix: number[][] = [];

  most_agree: number;
  least_agree: number;

  offset: number;

  /** SubmitOnce flag */
  submitted = false;

  /**
   * Constructor for QuestionnaireComponent
   * @param route @ng ActivatedRoute
   * @param router @ng router
   * @param fb @ng reactive form builder
   * @param surveyservice Survey Service Middleware
   * @param userservice User Service Middleware
   * @param window Window Wrapper
   */
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
        this.statements = res.statements;
        this.instructions = res.instructions[Settings.INS_QUESTIONNAIRE];
        // Using questionnaire field array as a reference, loop through and init new field objects to the form array
        res.questionnaire.forEach((field) => {
          this.ques_fa.push(this.createField(field));
        });
        this.getUserData();
      },
      err => {
        console.error(err);
        if (this.window.nativeWindow.confirm('Invalid Survey/Connection Error')) {
          if (!isDevMode()) { this.router.navigate(['/']);
          } else { console.error('Redirect to /'); }
        }
      }
    );
  }

  /** @ng reactive forms init */
  private createForm(): void {
    this.ques_fg = this.fb.group({
      fields: this.fb.array([])
    });
    this.ques_fa = this.ques_fg.get('fields') as FormArray;
  }

  /** @ng reaction form array init */
  private createField(field: string[]): FormGroup {
    let q_type = field[1];
    if (!q_type) { q_type = '0'; }
    return this.fb.group({
      question: field[0],
      question_type: field[1],
      answer: ['', Validators.required]
    });
  }

  // Get data from user service
  private getUserData() {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
    });
    this.userservice.getUser(this.survey_id, this.user_id).subscribe(
      (res: User) => {
        this.progress = res.progress;
        this.matrix = res.matrix;
        this.most_agree = this.matrix.length - 1;
        while (this.matrix[this.most_agree].length === 0 && this.most_agree > 0) {
          --this.most_agree;
        }
        this.least_agree = 0;
        while (this.matrix[this.least_agree].length === 0 && this.least_agree < (this.matrix.length - 1)) {
          ++this.least_agree;
        }
        this.offset = Math.floor(res.matrix.length / 2);
        this.checkRedirect();
      },
      (err) => {
        console.error(err);
        if (this.window.nativeWindow.confirm('Invalid/Corrupt User Information')) {
          if (!isDevMode()) { this.router.navigate(['survey', this.survey_id]);
          } else { console.error('Redirect to survey/:id'); }
        }
      }
    );
  }

  /**
   * A function to extract the necessary information needed to pass onto the user service
   */
  private getResponse(): string[] {
    const return_array = [];
    let invalid = false;
    this.ques_fa.value.forEach( (object) => {
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
    if (!this.submitted) {
      this.submitted = true;
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
          if (this.window.nativeWindow.confirm('An error occured whilst submitting')) {}
        });
      }
    }
  }

  /**
   * Automatically redirect if this user is on the wrong page
   */
  private checkRedirect() {
    if (this.progress !== 2) {
      if (this.window.nativeWindow.confirm('Error: Wrong Page! Redirecting... ')) {
        switch (this.progress) {
          case 0:
            if (!isDevMode()) {
              this.router.navigate(['initial-sort', this.survey_id],
              {
                skipLocationChange: true,
                queryParams: { user_id: this.user_id }
              });
            } else {
              console.error('Redirecting to initial-sort/:id');
            }
          break;
          case 1:
            if (!isDevMode()) {
              this.router.navigate(['q-sort', this.survey_id],
              {
                skipLocationChange: true,
                queryParams: { user_id: this.user_id }
              });
            } else {
              console.error('Redirecting to q-sort/:id');
            }
          break;
          case 3:
            if (!isDevMode()) {
              this.router.navigate(['submission', this.survey_id],
              {
                skipLocationChange: true,
                queryParams: { user_id: this.user_id }
              });
            } else {
              console.error('Redirecting to submission/:id');
            }
          break;
        }
      }
    }
  }

  ngOnInit(): void {
  }

}
