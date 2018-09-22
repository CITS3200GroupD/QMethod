import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../survey.service';     // Survey API
// import { UserService } from '../../user.service';      // User API

@Component({
  selector: 'app-initial-sort',
  templateUrl: './initial-sort.component.html',
  styleUrls: ['./initial-sort.component.css']
})
export class InitialSortComponent implements OnInit {

  /*statements = [
    { string: 'I can see myself fostering understanding between Australia and yyy'},
    { string: 'I can see myself enjoying recreational activities with yyy people'},
    { string: 'I can see myself speaking yyy better than many other Australians'},
    { string: 'I can see myself studying in yyy'},
    { string: 'I can see myself taking the WACE exam in yyy'},
    { string: 'I can see myself as a more knowledgeable person'},
    { string: 'I can see myself able to better understand people from any other culture'},
  ];*/


  // error = boolean;                     // TODO: Invalid survey message box on invalid survey id

  id: String;
  survey: any = {};

  // TODO: Change to index display
  current_index = 0;
  statementObjs: object[] = [];                 // TODO: Store statements as { id: number, string: String }

  disagree: String[] = [];
  neutral: String[] = [];
  agree: String[] = [];

  disagree_update: number[] = [];
  neutral_update: number[] = [];
  agree_update: number[] = [];

  TEMP_int_disagree: number[] = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  TEMP_int_neutral: number[] = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  TEMP_int_agree: number[] =  [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42];

  constructor( private route: ActivatedRoute,
    private router: Router,
    private surveyservice: SurveyService,
    // private userservice: UserService
  ) {
    this.route.params.subscribe(params => {
      this.surveyservice.getSurvey(params['id']).subscribe(res => {
        this.survey = res;

        // TODO: Loop over statements array, record index in { id: __ } and string in {string:___ }
        this.generateStatementsArray();
      });
    });
  }

  // TODO: Loop over statements array, record index in { id: __ } and string in {string:___ }
  private generateStatementsArray() {
    this.survey.statements.forEach( (item, index) => {
      const temp = {id: index, string: item};
      this.statementObjs.push(temp);
    });

    console.log('generateStatementsArray() called');
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
    this.disagree.push(e.dragData);
    this.disagree_update.push(e.dragData.id);
    this.removeStatement(e.dragData);
    this.removeNeutral(e.dragData);
    this.removeAgree(e.dragData);
  }

  onNeutralDrop(e: any) {
    this.removeNeutral(e.dragData);
    this.neutral.push(e.dragData);
    this.neutral_update.push(e.dragData.id);
    this.removeStatement(e.dragData);
    this.removeDisagree(e.dragData);
    this.removeAgree(e.dragData);
  }

  onAgreeDrop(e: any) {
    this.removeAgree(e.dragData);
    this.agree.push(e.dragData);
    this.agree_update.push(e.dragData.id);
    this.removeStatement(e.dragData);
    this.removeDisagree(e.dragData);
    this.removeNeutral(e.dragData);
  }

  removeStatement(e: any) {
    this.statementObjs.forEach( (item, index) => {

      if (item == e) { this.statementObjs.splice(index, 1); }
    });
    if (this.current_index >= this.statementObjs.length) {
      --this.current_index;
    }
  }

  removeDisagree(e: any) {
    this.disagree.forEach( (item, index) => {

      if (item == e) {
        this.disagree.splice(index, 1);
        this.disagree_update.splice(index, 1);
      }
    });
  }

  removeNeutral(e: any) {
    this.neutral.forEach( (item, index) => {

      if (item == e) {
        this.neutral.splice(index, 1);
        this.neutral_update.splice(index, 1);
      }
    });
  }

  removeAgree(e: any) {
    this.agree.forEach( (item, index) => {

      if (item == e) {
        this.agree.splice(index, 1);
        this.agree_update.splice(index, 1);
      }
    });
  }

  // TODO: button (hidden when arrays are not filled) that
  // 1) submits userdata to user api
  // 2) goes to q-sort page
  publishSortContinue() {
    console.log('publishSortContinue()');
    // this.userservice.updateUser(this.TEMP_int_disagree, this.TEMP_int_neutral, this.TEMP_int_agree, this.id);
    setTimeout(() => {
      // this.router.navigate(['q-sort']);
      this.router.navigate(['q-sort']);
    },
    500);
  }

  ngOnInit() {
  }

}
