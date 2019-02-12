import { Component, OnInit, isDevMode } from '@angular/core';                     // @ng core
import { Router } from '@angular/router';                                         // @ng router
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';            // @ng reactive forms
import { SurveyService } from 'src/app/survey.service';                             // QMd SurveyService Middleware
import { GridTemplates } from 'src/app/models';                                     // QMd Models
import { TestingRegister, TestingStatements, TestingQuestionnaire } from 'src/app/testing/Testing'; // QMd Testing
import { WindowWrap } from 'src/app/window-wrapper';                                // Wrapper for window
import * as Settings from 'config/Settings';                          // QMd Settings
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
/**
 * Component for handling the create page for admin interface
 */
export class CreateComponent implements OnInit {

  /** Registration Fields*/
  registration: string[] = [];
  /** Statements */
  statements: string[] = [];
  /** Questionnaire Questions*/
  questionnaire: string[] = [];
  /** Templates for default grid */
  cols_templates = GridTemplates;
  /** Angular reactive form */
  angForm: FormGroup;
  /** Alert Error flag */
  error = false;

  /**
   * Constructor for CreateComponent
   * @param surveyservice Survey Service Middleware to communicate with express RESTful API server
   * @param router @ng router
   * @param fb @ng FormBuilder to serve dynamic forms
   * @param window Wrapper for window
   */
  constructor(private surveyservice: SurveyService,
    private router: Router,
    private fb: FormBuilder,
    private window: WindowWrap
  ) {
    /* Deprecated 0.1.4a
      this.surveyservice.addAuthHeader('true');
    */
    this.createForm();
    // Set default range to QMd default range setting
    this.angForm.get('survey_range').setValue(Settings.DEFAULT_RANGE);
  }

  /**
   * ng reactive form initialisation
   */
  private createForm(): void {
    this.angForm = this.fb.group({

      survey_name: ['', Validators.required ],
      survey_range: ['', Validators.required ]
   });
  }

  /**
   * Create a survey object based on dynamic form elements and sync with database
   */
  addSurvey(): boolean {

    const name = this.angForm.get('survey_name').value;
    const range = Number(this.angForm.get('survey_range').value);
    let return_val = false;
    /*
     * DEBUG
     * if ( isDevMode() ) {
     *   console.log(`SEND => { ${name}, ${range}, [registration], [statements], [questionnaire] }`);
     *   console.log(`Registration: ${this.registration}`);
     *   console.log(`Statements: ${this.statements}`);
     *   console.log(`Questionnaire: ${this.questionnaire}`);
     * }
     */
    // Read statements, registration and questionnaire data from json.
    this.surveyservice.addSurvey(name, range, this.registration, this.statements, this.questionnaire)
      .subscribe(
        (res) => {
          // DEBUG
          // console.log(`RES <= ${res}`);
          return_val = true;
          this.router.navigate(['admin']);
        },
        (err) => {
          if (this.window.nativeWindow.confirm(`${err.message}`)) {
            this.ngOnInit();
            return_val = false;
          }
        });
      return return_val;
  }

  /**
   * Function called when a file is uploaded.
   * @param files Files uploaded
   */
  onUpload(files: FileList) {
    const reader = new FileReader();
    try {
      reader.readAsText(files[0]);
      reader.onload = () => {
        try {
          const input = JSON.parse(reader.result.toString());
          if (input.statements && input.statements.length < Settings.STATE_LIMIT) {
            this.statements = input.statements;
            for (let i = 1; i < this.cols_templates.length; i++) {
              if (this.statements.length <= this.cols_templates[i].max_statements) {
                this.angForm.get('survey_range').setValue(this.cols_templates[i].val);
                break;
              }
            }
          }
          if (input.questionnaire && input.questionnaire.length < Settings.FIELDS_LIMIT) {
            this.questionnaire = input.questionnaire;
          }
          if (input.registration && input.registration.length < Settings.FIELDS_LIMIT) {
            this.registration = input.registration;
          }
          this.error = false;
        } catch (err) {
          console.error(err);
          this.error = true;
        }
      };
    } catch (e) { }
  }

  /**
   * Function that is run on init
   */
  ngOnInit(): void {}
}
