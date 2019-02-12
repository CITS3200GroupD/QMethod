import { Component, OnInit } from '@angular/core';                      // @ng core
import { ActivatedRoute, Router } from '@angular/router';               // @ng route
import { HttpErrorResponse, HttpResponse } from '@angular/common/http'; // @ng HTTP responses
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';  // @ng reactive forms
import { GridTemplates, BlankSurvey, Survey } from 'src/app/models';      // QMd Defines - Models
import * as Settings from 'config/Settings';                // QMd Settings
import { SurveyService } from 'src/app/survey.service';                   // QMd Survey Service Middleware
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';                 // ng-bootstrap addon
import { WindowWrap } from 'src/app/window-wrapper';                      // wrapper for window

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
/**
 * Component for handling the edit page for admin interface
 */
export class EditComponent implements OnInit {
  /** The maximum length of a Survey's Name */
  NAME_LIMIT = Settings.NAME_LIMIT || 100;
  /** The maximum fields for Questionnaires/Registration */
  FIELDS_LIMIT = Settings.FIELDS_LIMIT || 10;
  /** The maximum number of statements */
  STATE_LIMIT = Settings.STATE_LIMIT || 80;
  /** The default Horizontal-X range for the Q-Sort Grid */
  private DEFAULT_RANGE =  Settings.DEFAULT_RANGE || 11;

  /** Pagination variable for current page */
  statements_page: number;
  /** Flag (set by callback) for grid validity vs number of statements */
  valid_grid: boolean;
  /*** ng form variable */
  angForm: FormGroup;

  /** survey object (representing survey data) for this component */
  survey: Survey = BlankSurvey;
  /** Templates for default column values */
  cols_templates = GridTemplates;
  /** variable for survey's current Horizontal-X range */
  range = this.DEFAULT_RANGE;
  /** Length variables for display */
  lengths = {
    questionnaire: 0,
    register: 0,
    statements: 0
  };

  /**
   * Constructor for EditComponent
   * @param route @ng ActivatedRoute
   * @param router @ng Router
   * @param surveyservice Survey Service Middleware to communicate with express RESTful API server
   * @param fb @ng FormBuilder to serve dynamic forms
   * @param window Wrapper for window
   */
  constructor(private route: ActivatedRoute,
    private router: Router,
    private surveyservice: SurveyService,
    private fb: FormBuilder,
    private window: WindowWrap) {
      /* Deprecated 0.1.4a
        this.surveyservice.addAuthHeader('true');
      */
      this.createForm();
      this.cols_templates = GridTemplates;
    }

  /**
   * ng reactive form initialisation
   */
  private createForm(): void {
    this.angForm = this.fb.group({
      survey_id: [{value: '', disabled: true}, Validators.required ],
      survey_name: ['', Validators.required ],
      survey_range: ['', Validators.required ]
    });
  }

  /**
   * Catch the specified error, print to console and alert the user.
   * @param error The error to be handled
   */
  private throwError(error): void {
    try {
      throw new Error(error);
    } catch (e) {
      alert(`${e.name}: ${e.message}`);
      console.error(error);
    }
  }

  /**
   * Update this survey object's horizontal-x range
   * @param cols The new horizontal-x value
   */
  updateRange(range: number): void {
    if (this.survey.publish) {
      this.throwError('Attempted to update a published server');
    } else {
      this.range = range;
      this.survey.range = range;
    }
  }

  /**
   * Update this survey object's grid parameters
   * @param cols The new grid to be set
   */
  updateGrid(cols: number[]): void {
    if (!this.survey.publish && this.valid_grid) {
      this.survey.cols = cols;
    }
  }

  /**
   * Callback method for edit-statements subcomponent to set statements & lengths
   */
  updateStatements(statements: string[]): void {
    if (!this.survey.publish) {
      this.survey.statements = statements;
      this.lengths.statements = statements.length;
    }
  }

  /**
   * Callback method for edit-forms subcomponent to set fields & lengths
   */
  // WIP - this method will have to be cloned and isolated for drop-down functionality
  updateFields(field: string, item: string[]): void {
    if (!this.survey.publish) {
      this.survey[field] = item;
      this.lengths[field] = item.length;
    }
  }

  /**
   * Callback method for edit-grid subcomponent to set valid_grid flag.
   */
  isInvalidGrid(bool: boolean): void {
    this.valid_grid = bool;
  }

  /**
   * Update the survey and sync with database
   * @param name Name of survey
   * @param range Range of survey
   */
  updateSurvey(name, range): void {
    if (this.survey.publish) {
      this.throwError('Attempted to update a published server');
    } else if (!this.valid_grid) {
      this.throwError('Invalid Grid');
    } else {
        this.survey.name = name;
        this.survey.range = range;                                                // Change this.survey obj name & range
        // Send this.survey => Survey service middleware updateSurvey() func
        this.surveyservice.updateSurvey(this.survey)
          .subscribe( (res: HttpResponse<Object>) => this.successfulUpdate(res, false), // Case 1: Normal HTTP response
                      (err: HttpErrorResponse) => this.failedUpdate(err));              // Case 2: Responded with error
    }
  }

  /**
   * Send a successful update prompt to user & console
   * @param res HttpResponse message to display
   * @param go_home Flag to either re-render or move to admin page
   */
  private successfulUpdate(res: HttpResponse<Object>, go_home: boolean): void {
    if (this.window.nativeWindow.confirm(`${res}!`)) {
      if (go_home) {
        this.router.navigate(['admin']);
      } else {
        this.ngOnInit();
      }
    }
  }

  /**
   * Send a failed update message to user & console
   * @param err Error to print
   */
  private failedUpdate(err: HttpErrorResponse): void {
    if (this.window.nativeWindow.confirm(`${err.error}`)) {
      console.error(err);
      this.ngOnInit();
    }
  }

  /**
   * Publish the current survey (and lock editing)
   */
  publishSurvey(): void {
    if (!this.valid_grid) {
      this.throwError('Invalid Grid');
    } else {
      if (this.window.nativeWindow.confirm(
        'Are you sure you wish to publish this survey? You can no longer edit this survey once published!'
      )) {
        this.survey.publish = true;
        this.surveyservice.updateSurvey(this.survey)
          .subscribe( (res: HttpResponse<Object>) => this.successfulUpdate(res, true) );
      }
    }
  }

  /**
   * Publish the current survey (and lock editing)
   */
  stopSurvey(): void {
    if (!this.valid_grid) {
      this.throwError('Invalid Grid');
    } else {
      if (this.window.nativeWindow.confirm(
        'Are you sure you wish to stop this survey?'
      )) {
        this.survey.publish = false;
        this.surveyservice.updateSurvey(this.survey)
          .subscribe( (res: HttpResponse<Object>) => this.successfulUpdate(res, true) );
      }
    }
  }

  /**
   * Function that is run on init
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // Get params from ActivatedRoute
      this.surveyservice.getSurvey(params['id']).subscribe(
        // Survey ID => survey service mw getSurvey() => this.survey
        (res: Survey) => {
          this.survey = res;
          this.lengths.statements = this.survey.statements.length;
          this.lengths.questionnaire = this.survey.questionnaire.length;
          this.lengths.register = this.survey.register.length;
          // We deliberately do NOT want to update this.range on initiation.

          this.angForm.get('survey_id').setValue(this.survey._id);
          this.angForm.get('survey_name').setValue(this.survey.name);
          this.angForm.get('survey_range').setValue(this.survey.range);
          // If survey has been published, disable all editing
          if (this.survey.publish) {
            this.angForm.disable();
          }
        },
        err => {
          console.error(err);
          this.window.nativeWindow.confirm('Invalid survey');
          // TODO: Better error messages
        }
      );
    });
  }
}
