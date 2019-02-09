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
/** Component for the Q-Sort Grid page */
export class QsortComponent implements OnInit {
  /** ID of the current survey */
  id: string;
  /** ID of the current user */
  user_id: string;
  /** Progress of the current user */
  progress: number;

  /** User's sorted disagree list */
  disagree: number[] = [];
  /** User's sorted neutral list */
  neutral: number[] = [];
  /** User's sorted agree list */
  agree: number[] = [];
  /** Statements of this survey */
  statement: string[] = [];

  /** Array of cell counts per column */
  grid: number[] = [];
  /** Index of disagree */
  disagree_index = 0;
  /** Index of neutral */
  neutral_index = 0;
  /** Index of agree */
  agree_index = 0;

  /** Index of the currently selected list (for clicking functionality)
   * 0 = disagree, 1 = neutral, 2 = agree
   */
  selected_list = 0;

  /** Offset variable (for displaying column headers) */
  offset: number;
  /** Number of rows in the grid */
  rows: number;
  /** Temporary holding aray */
  arr = Array;

  /** Grid/Matrix to be updated */
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
          if (!isDevMode()) { this.router.navigate(['/']);
          } else { console.error('Redirect to /'); }
        }
      }
    );
  }

  /**
   * Generate Matrix (fill with -1)
   */
  private initMatrix(): void {
    this.grid.forEach((col) => {
      const cells = Array(col).fill(-1);
      this.matrix.push(cells);
    });
    // DEBUG
    // console.log(this.matrix);
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
          if (!isDevMode()) { this.router.navigate(['survey', this.id]);
          } else { console.error('Redirecting to survey/:id'); }
        }
      });
    });
  }

  /**
   * Automatically redirect if this user is on the wrong page
   */
  private checkRedirect() {
    if (this.progress !== 1) {
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

  /** Selects a list (for click and place method)
   * @param list_id ID of the list (0 = disagree, 1 = neutral, 2 = agree)
  */
  select_click(list_id: number) {
    this.selected_list = list_id;
  }

  /** Update selection to next list */
  private select_update() {
    this.selected_list = (this.selected_list + 1) % 3;
  }

  /**
	 * Drop statements by clicking into the matrix
	 * @param col col number (for matrix)
	 * @param cell cell number (for matrix)
	 */
  drop_click(col: number, cell: number) {
    if (this.matrix[col][cell] === -1) {
      /* DEBUG
        console.log(`[${col}, ${cell}]`);
        console.log(this.disagree[this.disagree_index]);
        console.log(this.neutral[this.neutral_index]);
        console.log(this.agree[this.agree_index]);
      */
      switch (this.selected_list) {
        case 0:
          // console.log(this.disagree[this.disagree_index]);
          if (this.disagree[this.disagree_index] !== undefined) {
            this.matrix[col][cell] = this.disagree[this.disagree_index++];
            if (this.disagree[this.disagree_index] === undefined) {
              this.select_update();
            }
          } else {
            this.select_update();
          }
        break;
        case 1:
          if (this.neutral[this.neutral_index] !== undefined) {
            this.matrix[col][cell] = this.neutral[this.neutral_index++];
            if (this.neutral[this.neutral_index] === undefined) {
              this.select_update();
            }
          } else {
            this.select_update();
          }
        break;
        case 2:
          if (this.agree[this.agree_index] !== undefined) {
            this.matrix[col][cell] = this.agree[this.agree_index++];
            if (this.agree[this.agree_index] === undefined) {
              this.select_update();
            }
          } else {
            this.select_update();
          }
        break;
      }
    }
  }

  /**
	 * Drop statements by dragging into the matrix
	 * @param e event object
	 * @param col col number (for matrix)
	 * @param cell cell number (for matrix)
	 */
  drop(e: any, col: number, cell: number) {
    // removes from respective array
    const array = e.dragData.array;

    // moving statements in grid
    if (array === 'matrix' && e.dragData.index !== -1 && e.dragData.index !== undefined) {
      // swap statements if not empty cell
      this.matrix[e.dragData.col][e.dragData.cell] = this.matrix[col][cell];
      this.matrix[col][cell] = e.dragData.index;
    }

    // Add to matrix if index value is -1
    if (this.matrix[col][cell] === -1 && e.dragData.index !== undefined) { // Check that cell is empty
      if (array === 'disagree') {
        this.disagree_index++;
      } else if (array === 'neutral') {
        this.neutral_index++;
      } else if (array === 'agree') {
        this.agree_index++;
      } else if (array === 'matrix') {
        this.matrix[e.dragData.col][e.dragData.cell] = -1;
      }

      if (this.matrix.length < col + 1) {
        for (let i = 0; i <= col + 1; i++) {
          this.matrix.push([]);
        }
      }

      if (this.matrix[col].length < cell + 1) {
        for (let i = 0; i <= cell + 1; i++) {
          this.matrix[col].push(-1);
        }
      }

      // DEBUG
      // if ( isDevMode() ) { console.log(`${e.dragData.index} => ${col}, ${cell}`); }

      this.matrix[col][cell] = e.dragData.index;
    }
  }

  /**
   * Function called when grid is filled up.
   * Submits the collated data => QMd UserService MW
   * If successful, goes to Questionnaire page.
   */
  publishSortContinue() {
    /* DEBUG
     * if ( isDevMode() ) {
     *  console.log(`Matrix: ${this.matrix}`);
     * }
     */
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
