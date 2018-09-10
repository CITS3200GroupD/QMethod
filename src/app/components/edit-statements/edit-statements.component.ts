import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SurveyService } from '../../survey.service';


@Component({
  selector: 'app-edit-statements',
  templateUrl: './edit-statements.component.html',
  styleUrls: ['./edit-statements.component.css']
})

export class EditStatementsComponent implements OnInit {

  @Input() statements: any[];
  @Output() status = new EventEmitter<boolean>();

  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private surveyservice: SurveyService,
    private fb: FormBuilder) {
      this.createForm();
    }

    createForm() {
      this.angForm = this.fb.group({
        statement: ['', Validators.required ]
      });
    }

  addStatement(statement: string) {
    this.route.params.subscribe(params => {
      // console.log(statement);
      this.surveyservice.addStatement(params['id'], statement).subscribe(res => {
        this.status.emit(true);
      });
    });
  }

  deleteStatement(statement_id) {
    this.route.params.subscribe(params => {
      if (window.confirm('Are you sure you wish to delete this statement?')) {
        this.surveyservice.deleteStatement(params['id'], statement_id).subscribe(res => {
          this.status.emit(true);
        });
      }
    });
  }

  ngOnInit() {
  }
}
