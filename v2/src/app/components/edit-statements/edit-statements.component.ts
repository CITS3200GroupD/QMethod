import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Survey } from '../index/Survey';
import KurtOptions from '../index/Survey';
import { SurveyService } from '../../survey.service';


@Component({
  selector: 'app-edit-statements',
  templateUrl: './edit-statements.component.html',
  styleUrls: ['./edit-statements.component.css']
})

export class EditStatementsComponent implements OnInit {
  
  @Input() statements: any[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private surveyservice: SurveyService,
    private fb: FormBuilder) { 

    }
  
  updateStatement(statement, statementIndex) {
    console.log(statement);
    console.log(statementIndex);
  }

  deleteStatement(statement_id) {
    this.route.params.subscribe(params => {
      if (window.confirm('Are you sure you wish to delete this statement?')) {
        this.surveyservice.deleteStatement(params['id'], statement_id);
      }
    });
  }

  delStatement(statementIndex) {
    console.log(statementIndex);
  }

  ngOnInit() {
  }

}
