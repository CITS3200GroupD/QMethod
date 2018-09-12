import { Component, OnInit } from '@angular/core';
import { SurveyService } from '../../survey.service';     // Survey API

@Component({
  selector: 'app-initial-sort',
  templateUrl: './initial-sort-new.component.html',
  // templateUrl: './initial-sort.component.html',
  styleUrls: ['./initial-sort-new.component.css']
  // styleUrls: ['./initial-sort.component.css']
})
export class InitialSortComponent implements OnInit {
  /*
  statements = [
    { id: 0, string: 'I can see myself fostering understanding between Australia and yyy'},
    { id: 1, string: 'I can see myself enjoying recreational activities with yyy people'},
    { id: 2, string: 'I can see myself speaking yyy better than many other Australians'},
    { id: 3, string: 'I can see myself studying in yyy'},
    { id: 4, string: 'I can see myself taking the WACE exam in yyy'},
    { id: 5, string: 'I can see myself as a more knowledgeable person'},
    { id: 6, string: 'I can see myself able to better understand people from any other culture'},
  ];
  */

  // error = boolean;                     // TODO: Error message on invalid survey id
  TEMP_id = "5b979b3df196c457ac0ddbe2";   // Placeholder
  survey: any = {};

  current_index: number;

  // TODO: Change to index display
  statementObjs: object[];                 // TODO: Store statements as { id: number, string: String }
  disagree: String[];
  neutral: String[];
  agree: String[];

  constructor( private surveyservice: SurveyService) { 
    this.surveyservice.getSurvey(this.TEMP_id).subscribe(res => {
      this.survey = res;
      this.disagree = [];
      this.neutral = [];
      this.agree = [];

      // TODO: Loop over statements array, record index in { id: __ } and string in {string:___ }
      this.generateStatementsArray();
    });
  }

  // TODO: Loop over statements array, record index in { id: __ } and string in {string:___ }
  private generateStatementsArray() {
    // this.statements.forEach( (item, index) => { }
    console.log("generateStatementsArray() called");
    console.log(this.statementObjs);
  }

  onDisagreeDrop(e: any) {
    this.removeDisagree(e.dragData);
    this.disagree.push(e.dragData);
    this.removeStatement(e.dragData);
    this.removeNeutral(e.dragData);
    this.removeAgree(e.dragData);
  }

  onNeutralDrop(e: any) {
    this.removeNeutral(e.dragData);
    this.neutral.push(e.dragData);
    this.removeStatement(e.dragData);
    this.removeDisagree(e.dragData);
    this.removeAgree(e.dragData);
  }

  onAgreeDrop(e: any) {
    this.removeAgree(e.dragData);
    this.agree.push(e.dragData);
    this.removeStatement(e.dragData);
    this.removeDisagree(e.dragData);
    this.removeNeutral(e.dragData);
  }

  removeStatement(e: any) {
    // TODO: use statementsObj array instead of survey.statements
    this.survey.statements.forEach( (item, index) => {
      if (item == e) this.survey.statements.splice(index, 1);
    });
  }

  removeDisagree(e: any) {
    this.disagree.forEach( (item, index) => {
      // TODO: use statementsObj instead of statements string
      if (item == e) this.disagree.splice(index, 1);
    });
  }

  removeNeutral(e: any) {
    this.neutral.forEach( (item, index) => {
      // TODO: use statementsObj instead of statements string
      if (item == e) this.neutral.splice(index, 1);
    });
  }

  removeAgree(e: any) {
    this.agree.forEach( (item, index) => {
      // TODO: use statementsObj instead of statements string
      if (item == e) this.agree.splice(index, 1);
    });
  }

  // TODO: button (hidden when arrays are not filled) that
  // 1) submits userdata to user api 
  // 2) goes to q-sort page

  ngOnInit() {
  }

}
