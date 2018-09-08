import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Survey } from '../index/Survey';
import KurtOptions from '../index/Survey';
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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private surveyservice: SurveyService,
    private fb: FormBuilder) {
      this.createForm();
    }

    createForm() {
      this.angForm = this.fb.group({
            survey_id: [{value: '', disabled: true}, Validators.required ],
            survey_name: ['', Validators.required ],
            survey_kurt: ['', Validators.required ]
            // statements
      });
    }

    updateSurvey(survey_name, survey_kurt) {
      this.route.params.subscribe(params => {
        // console.log(params);
        this.surveyservice.updateSurvey(survey_name, survey_kurt, params['id']);
        setTimeout(() => {
          this.router.navigate(['index']);
        },
        500);
      });
    }

    ngOnInit() {
      this.route.params.subscribe(params => {
        // console.log(params);
        this.surveyservice.editSurvey(params['id']).subscribe(res => {
          this.survey = res;
          
          this.angForm.get('survey_id').setValue(this.survey._id);
          this.angForm.get('survey_name').setValue(this.survey.survey_name);
          this.angForm.get('survey_kurt').setValue(this.survey.survey_kurt);
          // console.log(this.survey);
      });
    });
  }
}
