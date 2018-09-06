import { Component, OnInit, Input} from '@angular/core';


@Component({
  selector: 'app-edit-statements',
  templateUrl: './edit-statements.component.html',
  styleUrls: ['./edit-statements.component.css']
})

export class EditStatementsComponent implements OnInit {
  
  @Input() statements: any[];

  constructor() { }

  
  updateStatement(statement, statementIndex) {
    console.log(statement);
    console.log(statementIndex);
    /*
    this.route.params.subscribe(params => {
      
      this.surveyservice.updateStatements(statements, params['id']);
      setTimeout(() => {
        this.router.navigate(['index']);
      },
      500);
    });
    */
  }

  delStatement(statementIndex) {
    console.log(statementIndex);
  }

  ngOnInit() {
  }

}
