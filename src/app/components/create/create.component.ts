import { Component, OnInit } from '@angular/core'; // ng core
import { Router } from '@angular/router'; // ng router
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';  // ng reactive  form
import { SurveyService } from '../../survey.service';     // survey service
import { GridTemplates } from '../../models';
import { TestingRegister, TestingStatements, TestingQuestionnaire } from '../../testing/Testing';
import { WindowWrap } from '../../window-wrapper';
import * as Settings from '../../../../config/Settings';

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
    private fb: FormBuilder,
    private window: WindowWrap
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.angForm = this.fb.group({

      survey_name: ['', Validators.required ],
      survey_range: ['', Validators.required ]
   });
  }

  addSurvey(name: string, range: number): void {
    this.surveyservice.addSurvey(name, range, TestingRegister, TestingStatements, TestingQuestionnaire)
      .subscribe(
        (res) => { this.router.navigate(['admin']); },
        (err) => {
          console.error(err.error);
          if (this.window.nativeWindow.confirm(`${err.error}`)) {
            this.ngOnInit();
          }
        });
  }

  ngOnInit(): void {
    this.angForm.get('survey_range').setValue(Settings.DEFAULT_RANGE);
  }

}
