import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../survey.service';           // QMd Survey Service MW
import { UserService } from '../../user.service';               // QMd User Service MW           
import { Survey, User } from '../../models';
import { WindowWrap } from '../../window-wrapper';

@Component({
  selector: 'app-qsort',
  templateUrl: './qsort.component.html',
  styleUrls: ['./qsort.component.css']
})
export class QsortComponent implements OnInit {
  id: string;
  user_id: string;
  survey: Survey;
  user: User;

  disagree: number[] = [11, 12, 13, 19, 20, 21, 22];
  neutral: number[] = [5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18];
  agree: number[] = [0, 1, 2, 3, 4];
  statement: string[] = [];

  disagree_index: number = 0;
  neutral_index: number = 0;
  agree_index: number = 0;

  grid: number[] = [];
  offset: number;
  rows: number;
  arr = Array;

  matrix: number[][] = [];

  constructor( private route: ActivatedRoute,
    private router: Router,
    private surveyservice: SurveyService,
    private userservice: UserService,
    private window: WindowWrap) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getSurveyData();
    });
  }

  // Get data from survey service
  private getSurveyData() {
    this.surveyservice.getSurvey(this.id).subscribe( (res: Survey) => {
      this.survey = res;
      this.grid = this.survey.cols;
      this.statement = this.survey.statements;
      //this.getUserData();
    });
  }

  // Get data from user service
  private getUserData() {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
      this.userservice.getUser(this.id, this.user_id).subscribe( (res: User) => {
        this.user = res;
        //this.checkRedirect();
        this.agree = this.user.sort_agree;
        this.neutral = this.user.sort_neutral;
        this.disagree = this.user.sort_disagree;
      },
      (err) => {
        if (this.window.nativeWindow.confirm(err.message)) {
          this.router.navigate(['/']);
        }
      });
    });
  }

  // Automatically redirect if this user is on the wrong page
  private checkRedirect() {
    if (this.user.progress != 0) {
      if (this.window.nativeWindow.confirm('Error: Wrong Page! Redirecting... ')) {
        switch (this.user.progress) {
          case 1:
            this.router.navigate(['q-sort', this.id],
            {
              skipLocationChange: !isDevMode(),
              queryParams: { user_id: this.user_id }
            });
          break;
          case 2:
            this.router.navigate(['questionnaire', this.id],
            {
              skipLocationChange: !isDevMode(),
              queryParams: { user_id: this.user_id }
            });
          break;
          case 3:
            // TODO: Results page
            this.router.navigate(['questionnaire', this.id],
            {
              skipLocationChange: !isDevMode(),
              queryParams: { user_id: this.user_id }
            });
          break;
        }
      }
    }
  }

  drop(e: any, col: number, cell: number){
    //removes from respective array
    var array = e.dragData.array;
    if (array == 'disagree') {
      this.disagree.forEach( (item, index) => {
        if (item == e) { this.disagree.splice(index, 1); }
      });
      this.disagree_index++;
    } else if (array == 'neutral') {
      this.neutral.forEach( (item, index) => {
        if (item == e) { this.neutral.splice(index, 1); }
      });
      this.neutral_index++;
    } else if (array == "agree") {
      this.agree.forEach( (item, index) => {
        if (item == e) { this.agree.splice(index, 1); }
      });
      this.agree_index++;
    }
    
    if (this.matrix.length < col+1) {
      for (var i = 0; i <= col+1; i++) {
        this.matrix.push([]);
      }
    }

    if(this.matrix[col].length < cell+1) {
      for (var i = 0; i <= cell+1; i++) {
        this.matrix[col].push(-1);
      }
    }

    //add to matrix
    /*if (!this.matrix[col][cell]) { //check that cell is empty
      this.matrix[col].splice(cell, e.dragData.index);
    }

    console.log(this.matrix[col][cell]);
    //this.matrix[col][cell] = e.dragData;*/

  }




  ngOnInit() {   
  }
}
