import { Component, OnInit } from '@angular/core'; // ng core
import { Router } from '@angular/router'; // ng router
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';  // ng reactive  form
import { SurveyService } from '../../survey.service';     // survey service

import KurtOptions from '../index/Survey';

// core
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  kurtOptions = KurtOptions;

  angForm: FormGroup;

  constructor(private surveyservice: SurveyService,
    private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({

      survey_name: ['', Validators.required ],
      survey_kurt: ['7', Validators.required ]
   });
  }

  addSurvey(survey_name, survey_kurt) {
    this.surveyservice.addSurvey(survey_name, survey_kurt);
    // console.log(survey_kurt);
    setTimeout(() => {
      this.router.navigate(['index']);
    },
    350);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  ngOnInit() {
  }

}
