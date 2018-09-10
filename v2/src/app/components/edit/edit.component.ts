import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import KurtOptions from '../../Survey';
import { SurveyService } from '../../survey.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  kurtOptions = KurtOptions;

  survey: any = {};
  angForm: FormGroup;
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
        // survey_grid: ['', Validators.required]
      });
    }

    updateRange(range) {
      if (!this.survey.publish)
        this.survey.range = range;
      else {
        try {
          throw new Error("Attempted to update a published server");
        } 
        catch (e) {
          alert(e.name+": "+e.message);
        }
      }
    }

    updateSurvey(name, range) {
      if (!this.survey.publish) {
        this.route.params.subscribe(params => {
          this.surveyservice.updateSurvey(name, range, false, params['id']);
          setTimeout(() => {
            // this.router.navigate(['admin']);
            this.ngOnInit();
          },
          500);
        });
      }
      else {
        try {
          throw new Error("Attempted to update a published server");
        } 
        catch (e) {
          alert(e.name+": "+e.message);
        }
      }
    }

    publishSurvey() {
      if (window.confirm('Are you sure you wish to publish this survey? You can no longer edit this survey once published!')) {
        this.survey.publish = true;
        this.route.params.subscribe(params => {
          this.surveyservice.updateSurvey(this.survey.name, this.survey.range, true, params['id']);
          setTimeout(() => {
            this.router.navigate(['admin']);
            // this.ngOnInit();
          },
          500);
        });
      }
    }
    
  /* TODO: Private Method to check that totalStatements and numStatements (in grid) are the same value
   * ONLY enable publishing when totalStatements=numStatements
   */

    ngOnInit() {
      this.route.params.subscribe(params => {
        // console.log(params);
        this.surveyservice.editSurvey(params['id']).subscribe(res => {
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
