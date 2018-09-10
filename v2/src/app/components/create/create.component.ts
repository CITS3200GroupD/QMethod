import { Component, OnInit } from '@angular/core'; // ng core
import { Router } from '@angular/router'; // ng router
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';  // ng reactive  form
import { SurveyService } from '../../survey.service';     // survey service

import KurtOptions from '../../Survey';

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

  private createForm() {
    this.angForm = this.fb.group({

      survey_name: ['', Validators.required ],
      survey_range: ['', Validators.required ]
   });
  }

  addSurvey(name, range) {
    this.surveyservice.addSurvey(name, range);
    setTimeout(() => {
      this.router.navigate(['admin']);
    },
    500);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  ngOnInit() {
    this.angForm.get('survey_range').setValue(9);
  }

}
