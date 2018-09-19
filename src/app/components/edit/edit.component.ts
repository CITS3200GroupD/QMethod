import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { GridTemplates } from '../../models';
import { SurveyService } from '../../survey.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WindowWrap } from '../../window-wrapper';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as Settings from '../../../../config/Settings';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  NAME_LIMIT = Settings.NAME_LIMIT || 100;
  FIELDS_LIMIT = Settings.FIELDS_LIMIT || 10;
  STATE_LIMIT = Settings.STATE_LIMIT || 80;
  cols_templates = GridTemplates;

  statements_page: number;

  survey: any = {};
  valid_grid: boolean;
  angForm: FormGroup;

  range: number;
  lengths = {
    questionnaire: 0,
    register: 0,
    statements: 0
  };

  constructor(private route: ActivatedRoute,
    private router: Router,
    private surveyservice: SurveyService,
    private fb: FormBuilder,
    private window: WindowWrap) {
      this.createForm();
      this.cols_templates = GridTemplates;
    }

  private createForm(): void {
    this.angForm = this.fb.group({
      survey_id: [{value: '', disabled: true}, Validators.required ],
      survey_name: ['', Validators.required ],
      survey_range: ['', Validators.required ]
    });
  }

  private throwError(error): void {
    try {
      throw new Error(error);
    } catch (e) {
      alert(`${e.name}: ${e.message}`);
    }
  }

  updateRange(range: number): void {
    if (this.survey.publish) {
      this.throwError('Attempted to update a published server');
    } else {
      this.range = range;
      this.survey.range = range;
    }
  }

  updateGrid(cols: number[]): void {
    if (!this.survey.publish && this.valid_grid) {
      this.survey.cols = cols;
    }
  }

  updateStatements(statements: string[]): void {
    if (!this.survey.publish) {
      this.survey.statements = statements;
      this.lengths.statements = statements.length;
    }
  }

  updateFields(field: string, item: string[]): void {
    if (!this.survey.publish) {
      this.survey[field] = item;
      this.lengths[field] = item.length;
    }
  }

  isInvalidGrid(bool: boolean): void {
    this.valid_grid = bool;
  }

  updateSurvey(name, range): void {
    if (this.survey.publish) {
      this.throwError('Attempted to update a published server');
    } else if (!this.valid_grid) {
      this.throwError('Invalid Grid');
    } else {
      this.route.params.subscribe(params => {
        this.survey.name = name;
        this.survey.range = range;
        this.surveyservice.updateSurvey(this.survey)
          .subscribe( res => this.successfulUpdate(res, false),
                      err => this.failedUpdate(err));
      });
    }
  }

  private successfulUpdate(res, go_home: boolean): void {
    if (this.window.nativeWindow.confirm('Successfully Updated!')) {
      if (go_home) {
        this.router.navigate(['admin']);
      } else {
        this.ngOnInit();
      }
    }
  }

  private failedUpdate(err: HttpErrorResponse): void {
    if (this.window.nativeWindow.confirm(`${err.error}`)) {
      this.ngOnInit();
    }
  }

  publishSurvey(): void {
    if (!this.valid_grid) {
      this.throwError('Invalid Grid');
    } else {
      if (this.window.nativeWindow.confirm('Are you sure you wish to publish this survey? You can no longer edit this survey once published!')) {
        this.survey.publish = true;
        this.route.params.subscribe(params => {
          this.surveyservice.updateSurvey(this.survey)
            .subscribe( res => this.successfulUpdate(res, true) );
        });
      }
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log(params);
      this.surveyservice.getSurvey(params['id']).subscribe(
        res => {
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
          // TODO: Error Message Prompt for UX
        }
      );
    });
  }
}
