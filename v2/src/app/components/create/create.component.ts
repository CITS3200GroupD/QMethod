import { Component, OnInit } from '@angular/core'; // ng core
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';  // ng reactive  form
import { SurveyService } from '../../survey.service';     // survey service

// core
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  angForm: FormGroup;

  constructor(private adunitservice: SurveyService, private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      unit_name: ['', Validators.required ],
      unit_price: ['', Validators.required ]
   });
  }

  addSurvey(survey_name, survey_kurt) {
    this.adunitservice.addSurvey(survey_name, survey_kurt);
}

  ngOnInit() {
  }

}