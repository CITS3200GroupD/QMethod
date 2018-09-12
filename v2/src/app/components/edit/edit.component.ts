import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { gridTemplates } from '../../Survey';
import { SurveyService } from '../../survey.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  NAME_LIMIT = 100;

  gridTemplates = gridTemplates;

  survey: any = {};
  valid_grid: boolean;
  range: number;
  angForm: FormGroup;
  cols: number[];
  label_x: number;
  range_y: number;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private surveyservice: SurveyService,
    private fb: FormBuilder) {
      this.createForm();
    }

  private createForm() {
    this.angForm = this.fb.group({
      survey_id: [{value: '', disabled: true}, Validators.required ],
      survey_name: ['', Validators.required ],
      survey_range: ['', Validators.required ]
    });
  }

  private throwError(error) {
    try {
      throw new Error(error);
    } catch (e) {
      alert(`${e.name}: ${e.message}`);
    }
  }

  updateRange(range) {
    if (this.survey.publish) {
      this.throwError('Attempted to update a published server');
    } else {
      this.range = range;
    }
  }

  updateGrid(cols) {
    if (!this.survey.publish && this.valid_grid) {
      this.cols = cols;
    }
  }

  isInvalidGrid(bool) {
    this.valid_grid = bool;
  }

  updateSurvey(name, range) {
    if (this.survey.publish) {
      this.throwError('Attempted to update a published server');
    } else if (!this.valid_grid) {
      this.throwError('Invalid Grid');
    } else {
      this.route.params.subscribe(params => {
        this.surveyservice.updateSurvey(name, range, this.cols, false, this.survey.users, params['id']);
        setTimeout(() => {
          this.ngOnInit();
        },
        500);
      });
    }
  }

  publishSurvey() {
    if (!this.valid_grid) {
      this.throwError('Invalid Grid');
    } else {
      if (window.confirm('Are you sure you wish to publish this survey? You can no longer edit this survey once published!')) {
        this.survey.publish = true;
        this.route.params.subscribe(params => {
          this.surveyservice.updateSurvey(this.survey.name, this.survey.range, this.cols, true, this.survey.users, params['id']);
          setTimeout(() => {
            this.router.navigate(['admin']);
          },
          500);
        });
      }
    }
  }

/* TODO: Private Method to check that totalStatements and numStatements (in grid) are the same value
  * ONLY enable publishing when totalStatements=numStatements
  */

  ngOnInit() {
    this.route.params.subscribe(params => {
      // console.log(params);
      this.surveyservice.getSurvey(params['id']).subscribe(res => {
        this.survey = res;

        this.angForm.get('survey_id').setValue(this.survey._id);
        this.angForm.get('survey_name').setValue(this.survey.name);
        this.angForm.get('survey_range').setValue(this.survey.range);
        // If survey has been published, disable all editing
        if (this.survey.publish) {
          this.angForm.disable();
        }
      });
    });
  }
}
