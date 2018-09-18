import { Component, OnInit } from '@angular/core'; // ng core
import { Router } from '@angular/router'; // ng router
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';  // ng reactive  form
import { SurveyService } from '../../survey.service';     // survey service
import { GridTemplates } from '../../Survey';
import { TestingRegister, TestingStatements, TestingQuestionnaire } from '../../Testing';

const DEFAULT_RANGE = 11;

// core
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  cols_templates = GridTemplates;
  statements: string[];

  angForm: FormGroup;

  constructor(private surveyservice: SurveyService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  private createForm() {
    this.angForm = this.fb.group({

      survey_name: ['', Validators.required ],
      survey_range: ['', Validators.required ]
   });
  }

  addSurvey(name, range) {
    this.surveyservice.addSurvey(name, range, TestingRegister, TestingStatements, TestingQuestionnaire)
      .subscribe(
        (res) => { this.router.navigate(['admin']); },
        (err) => {
          console.error(err.error);
          if (window.confirm(`${err.error}`)) {
            this.ngOnInit();
          }
        });
  }

  ngOnInit() {
    this.angForm.get('survey_range').setValue(DEFAULT_RANGE);
  }

}
