import { isDevMode, Component, OnInit } from '@angular/core';
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
  progress: number;

  disagree: number[] = [];
  neutral: number[] = [];
  agree: number[] = [];
  statement: string[] = [];

  grid: number[] = [];
  disagree_index: number = 0;
  neutral_index: number = 0;
  agree_index: number = 0;

  offset: number;
  rows: number;
  arr = Array;

  matrix: number[][] = [];

  /**
   * Constructor for QsortComponent
   * @param route @ng activated route
   * @param router @ng router
   * @param surveyservice Survey Service Middleware
   * @param userservice User Service Middleware
   * @param window Window Wrapper
   */
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

  /**
   * Get data from survey service
   */
  private getSurveyData() {
    this.surveyservice.getSurvey(this.id).subscribe(
      (res: Survey) => {
        this.statement = res.statements;
        this.grid = res.cols;
        this.offset = Math.floor(this.grid.length / 2);
        this.initMatrix();
        this.getUserData();
      },
      (err) => {
        console.error(err);
        if (this.window.nativeWindow.confirm('Invalid Survey/Connection Error')) {
          if (!isDevMode()) { this.router.navigate(['/']); }
          else { console.error('Redirect to /'); }
        }
      }
    );
  }

  /**
   * Generate Matrix (fill with -1)
   */
  private initMatrix(): void {
    this.grid.forEach((col)=> {
      let cells = Array(col).fill(-1);
      this.matrix.push(cells);
    });
    console.log(this.matrix);
  }

  /**
   * Get data from user service
   */
  private getUserData() {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
      this.userservice.getUser(this.id, this.user_id).subscribe( (res: User) => {
        this.progress = res.progress;
        this.checkRedirect();
        this.agree = res.sort_agree;
        this.neutral = res.sort_neutral;
        this.disagree = res.sort_disagree;
      },
      (err) => {
        console.error(err);
        if (this.window.nativeWindow.confirm('Invalid/Corrupt User Information')) {
          if (!isDevMode()) { this.router.navigate(['survey', this.id]); }
          else { console.error('Redirecting to survey/:id'); }
        }
      });
    });
  }

  /**
   * Automatically redirect if this user is on the wrong page
   */
  private checkRedirect() {
    if (this.progress != 1) {
      if (this.window.nativeWindow.confirm('Error: Wrong Page! Redirecting... ')) {
        switch (this.progress) {
          case 0:
            if (!isDevMode()) {
              this.router.navigate(['initial-sort', this.id],
              {
                skipLocationChange: true,
                queryParams: { user_id: this.user_id }
              });
            } else {
              console.error('Redirecting to initial-sort/:id');
            }
          break;
          case 2:
            if (!isDevMode()) {
              this.router.navigate(['questionnaire', this.id],
              {
                skipLocationChange: true,
                queryParams: { user_id: this.user_id }
              });
            } else {
              console.error('Redirecting to questionnaire/:id');
            }
          break;
          case 3:
            if (!isDevMode()) {
              this.router.navigate(['submission', this.id],
              {
                skipLocationChange: true,
                queryParams: { user_id: this.user_id }
              });
            } else {
              console.error('Redirecting to submission/:id');
            }
          break;
        }
      }
    }
  }

  drop(e: any, col: number, cell: number){
    // removes from respective array
    var array = e.dragData.array;

    // moving statements in grid
    if (array == 'matrix' && e.dragData.index != undefined) {
      console.log(this.matrix[col][cell]);
      if (this.matrix[col][cell] == 1) {
        this.matrix[e.dragData.col][e.dragData.cell] = -1;
      } else { // swap statements
        this.matrix[e.dragData.col][e.dragData.cell] = this.matrix[col][cell];
      }
      this.matrix[col][cell] = e.dragData.index;
    }

    // Add to matrix if index value is -1
    if (this.matrix[col][cell] == -1 && e.dragData.index != undefined) { // Check that cell is empty
      if (array == 'disagree') {
        /* this.disagree.forEach( (item, index) => {
          if (item == e) { this.disagree.splice(index, 1); }
        }); */
        this.disagree_index++;
      } else if (array == 'neutral') {
        /* this.neutral.forEach( (item, index) => {
          if (item == e) { this.neutral.splice(index, 1); }
        }); */
        this.neutral_index++;
      } else if (array == 'agree') {
        /* this.agree.forEach( (item, index) => {
          if (item == e) { this.agree.splice(index, 1);}
        }); */
        this.agree_index++;
      } else if (array == 'matrix') {
        this.matrix[e.dragData.col][e.dragData.cell] = -1;
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

      if ( isDevMode() ) { console.log(`${e.dragData.index} => ${col}, ${cell}`); }
      // this.matrix[col].splice(cell, e.dragData.index);
      this.matrix[col][cell] = e.dragData.index;
    }

  }

  
  publishSortContinue() {
    if ( isDevMode() ) {
      console.log(`Matrix: ${this.matrix}`);
    }
    const input = {
      matrix: this.matrix
    };
    this.userservice.updateUser(this.id, this.user_id, input).subscribe( res => {
    this.router.navigate(['questionnaire', this.id], {
      skipLocationChange: !isDevMode(),
        queryParams: {
          user_id: this.user_id
        }
      });
    },
    err => {
      console.error(err);
      if (this.window.nativeWindow.confirm('An error has occured whilst submitting')) {}
    });
  }

  ngOnInit() {
  }
}
