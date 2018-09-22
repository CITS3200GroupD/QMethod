import { Component, OnInit, isDevMode } from '@angular/core';                     // @ng core
import { Router } from '@angular/router';                                         // @ng router
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';            // @ng reactive forms
import { SurveyService } from '../../survey.service';                             // QMd SurveyService Middleware
import { GridTemplates } from '../../models';                                     // QMd Models
import { TestingRegister, TestingStatements, TestingQuestionnaire } from '../../testing/Testing'; // QMd Testing
import { WindowWrap } from '../../window-wrapper';                                // Wrapper for window
import * as Settings from '../../../../config/Settings';                          // QMd Settings
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
/**
 * Component for handling the create page for admin interface
 */
export class CreateComponent implements OnInit {
  /** Statements */
  private statements: string[];
  /** Templates for default grid */
  cols_templates = GridTemplates;
  /** Angular reactive form */
  angForm: FormGroup;

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
   * Create a survey object and sync with database
   * @param name Name of survey
   * @param range Range of survey
   */
  addSurvey(name: string, range: number): boolean {
    // TODO: Modify function to also send statement, registration and questionnaire list to survey service MW
    let return_val = false;
    if ( isDevMode() ) {
      console.log(`SEND => { ${name}, ${range}, [register], [statements], [questionnaire] }`);
    }
    // TODO: Replace with non-placeholders
    // TODO: Read statements, registration and questionnaire data from json.
    this.surveyservice.addSurvey(name, range, TestingRegister, TestingStatements, TestingQuestionnaire)
      .subscribe(
        (res) => {
          console.log(`RES <= ${res}`);
          return_val = true;
          this.router.navigate(['admin']);
        },
        (err) => {
          if (this.window.nativeWindow.confirm(`${err.error}`)) {
            this.ngOnInit();
            return_val = false;
          }
        });
      return return_val;
  }

  /**
   * Function that is run on init
   */
  ngOnInit(): void {}
}
