import { Component, OnInit } from '@angular/core'; // ng core
import { Router } from '@angular/router'; // ng router
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';  // ng reactive  form
import { SurveyService } from '../../survey.service';     // survey service
import { gridTemplates } from '../../Survey';

const DEFAULT_RANGE = 11;

// core
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  gridTemplates = gridTemplates;

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
    const statements = [ 'Testing 1', 'Testing 2', 'Testing 3', 'Testing 4', 'Testing 5',
                    'Testing 6', 'Testing 7', 'Testing 8', 'Testing 9', 'Testing 10',
                  'Super long statements should be this length to test if this is a viable or not in the long run.'];
    this.surveyservice.addSurvey(name, range, statements);
    setTimeout(() => {
      this.router.navigate(['admin']);
    },
    500);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  ngOnInit() {
    this.angForm.get('survey_range').setValue(DEFAULT_RANGE);
  }

}
