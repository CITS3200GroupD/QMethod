import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../survey.service';     // Survey API MW
import { UserService } from '../../user.service';         // User API MW

import { TempIntDisagree, TempIntNeutral, TempIntAgree } from '../../testing/Testing'; // TODO: This will eventually need to be removed entirely

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

  // error = boolean;                     // TODO: Invalid survey message box on invalid survey id

  id: string;
  survey: any;

  // TODO: Change to index display
  current_index = 0;
  statementObjs: object[] = [];                 // TODO: Store statements as { id: number, string: string }

  disagree: string[] = [];
  neutral: string[] = [];
  agree: string[] = [];

  disagree_update: number[];
  neutral_update: number[];
  agree_update: number[];

  constructor( private route: ActivatedRoute,
    private router: Router,
    private surveyservice: SurveyService,
    // private userservice: UserService
  ) {
    this.route.params.subscribe(params => {
      this.surveyservice.getSurvey(params['id']).subscribe(res => {
        this.survey = res;
        this.statementObjs = this.survey.statements;    // TODO: Comment out

        // TODO: Loop over statements array, record index in { id: __ } and string in {string:___ }
        this.generateStatementsArray();
      });
    });
  }

  // TODO: Loop over statements array, record index in { id: __ } and string in {string:___ }
  private generateStatementsArray() {
    // this.statements.forEach( (item, index) => { }
    console.log('generateStatementsArray() called');
    // console.log(this.statementObjs);
  }

  increaseIndex() {
    if (this.current_index + 1 < this.statementObjs.length) {
      this.current_index++;
    }
  }

  decreaseIndex() {
    if (this.current_index > 0) {
      this.current_index--;
    }
  }

  onDisagreeDrop(e: any) {
    this.removeDisagree(e.dragData);
    this.disagree.push(e.dragData);   // TODO: push string to disagree and index value to disagree_update
    this.removeStatement(e.dragData);
    this.removeNeutral(e.dragData);
    this.removeAgree(e.dragData);
  }

  onNeutralDrop(e: any) {
    this.removeNeutral(e.dragData);
    this.neutral.push(e.dragData);  // TODO: push string to disagree and index value to disagree_update
    this.removeStatement(e.dragData);
    this.removeDisagree(e.dragData);
    this.removeAgree(e.dragData);
  }

  onAgreeDrop(e: any) {
    this.removeAgree(e.dragData);
    this.agree.push(e.dragData); // TODO: push string to disagree and index value to disagree_update
    this.removeStatement(e.dragData);
    this.removeDisagree(e.dragData);
    this.removeNeutral(e.dragData);
  }

  removeStatement(e: any) {
    // TODO: use item.string == e.string
    this.statementObjs.forEach( (item, index) => {
      if (item == e) { this.statementObjs.splice(index, 1); }
    });
    if (this.current_index >= this.statementObjs.length) {
      --this.current_index;
    }
  }

  removeDisagree(e: any) {
    this.disagree.forEach( (item, index) => {
      // TODO: use item.string == e.string
      if (item == e) { this.disagree.splice(index, 1); }
    });
  }

  removeNeutral(e: any) {
    this.neutral.forEach( (item, index) => {
      // TODO: use item.string == e.string
      if (item == e) { this.neutral.splice(index, 1); }
    });
  }

  removeAgree(e: any) {
    this.agree.forEach( (item, index) => {
      // TODO: use item.string == e.string
      if (item == e) { this.agree.splice(index, 1); }
    });
  }

  // TODO: button (hidden when arrays are not filled) that
  // 1) submits userdata to user api
  // 2) goes to q-sort page
  publishSortContinue() {
    console.log('publishSortContinue()');
    // this.userservice.updateUser(TempIntDisagree, TempIntNeutral, TempIntAgree, this.id);
    setTimeout(() => {
      // this.router.navigate(['q-sort']);
      this.router.navigate(['q-sort']);
    },
    500);
  }

  ngOnInit() {
  }

}
