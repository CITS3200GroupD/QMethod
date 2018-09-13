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
    const TEMP_statements = [ 
      'I can see myself fostering understanding between Australia and yyy', 
      'I can see myself enjoying recreational activities with yyy people',
      'I can see myself speaking yyy better than many other Australians',
      'I can see myself studying in yyy',
      'I can see myself taking the WACE exam in yyy',
      'I can see myself as a more knowledgeable person',
      'I can see myself able to better understand people from any other culture',
      'I can see myself fostering understanding between Australia and yyy 2', 
      'I can see myself enjoying recreational activities with yyy people 2',
      'I can see myself speaking yyy better than many other Australians 2',
      'I can see myself studying in yyy 2',
      'I can see myself taking the WACE exam in yyy 2',
      'I can see myself as a more knowledgeable person 2',
      'I can see myself able to better understand people from any other culture 2',
      'I can see myself fostering understanding between Australia and yyy 3', 
      'I can see myself enjoying recreational activities with yyy people 3',
      'I can see myself speaking yyy better than many other Australians 3',
      'I can see myself studying in yyy 3',
      'I can see myself taking the WACE exam in yyy 3',
      'I can see myself as a more knowledgeable person 3',
      'I can see myself able to better understand people from any other culture 3',
      'I can see myself fostering understanding between Australia and yyy 4', 
      'I can see myself enjoying recreational activities with yyy people 4',
      'I can see myself speaking yyy better than many other Australians 4',
      'I can see myself studying in yyy 4',
      'I can see myself taking the WACE exam in yyy 4',
      'I can see myself as a more knowledgeable person 4',
      'I can see myself able to better understand people from any other culture 4',
      'I can see myself fostering understanding between Australia and yyy 5', 
      'I can see myself enjoying recreational activities with yyy people 5',
      'I can see myself speaking yyy better than many other Australians 5',
      'I can see myself studying in yyy 5',
      'I can see myself taking the WACE exam in yyy 5',
      'I can see myself as a more knowledgeable person 5',
      'I can see myself able to better understand people from any other culture 5'
    ];
    this.surveyservice.addSurvey(name, range, TEMP_statements);
    setTimeout(() => {
      this.router.navigate(['admin']);
    },
    500);
  }

  ngOnInit() {
    this.angForm.get('survey_range').setValue(DEFAULT_RANGE);
  }

}
