import { isDevMode, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from 'src/app/survey.service';           // QMd Survey Service MW
import { UserService } from 'src/app/user.service';               // QMd User Service MW
import { Survey, User } from 'src/app/models';
import { WindowWrap } from 'src/app/window-wrapper';
import * as Settings from 'config/Settings';



@Component({
  selector: 'app-initial-sort',
  templateUrl: './initial-sort.component.html',
  styleUrls: ['./initial-sort.component.css']
})
export class InitialSortComponent implements OnInit {

  /** Survey id */
  id: string;
  /** User id */
  user_id: string;
  /** Survey */
  survey: Survey;
  /** Instructions */
  instructions: string[] = [];
  /** Statements */
  statements: string[] = [];
  /** Statements ids */
  statements_sort: number[] = [];

  /** Iniital-sort progress */
  progress: number;
  /** Array index (for display) */
  current_index = 0;
  /** Disagree statements*/
  disagree: number[] = [];
  /** Neutral statements */
  neutral: number[] = [];
  /** Agree statements */
  agree: number[] = [];

  /** Flag to indicate completed submission */
  submitted = false;

  /**
   * Constructor for Activated Route
   * @param route @ng router
   * @param router @ng ActivatedRoute
   * @param surveyservice Survey Service Middleware to communicate with express RESTful API server
   * @param userservice User Service Middleware to communicate with express RESTful API server
   * @param window wrapper for window
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
   * Call Survey Service Middleware for survey data.
   * Add statement index as id into statements_sort
   * If successful, call getUserData() to retreive user properties.
   */
  private getSurveyData() {
    this.surveyservice.getSurvey(this.id).subscribe( (res: Survey) => {
      this.survey = res;
      this.statements = this.survey.statements;
      this.instructions = this.survey.instructions[Settings.INS_INIT_SORT];
      for (let i = 0; i < this.statements.length; i++) {
        this.statements_sort.push(i);
      }
      this.getUserData();
    },
    (err) => {
      if (this.window.nativeWindow.confirm('Invalid Survey')) {
        if (!isDevMode()) { this.router.navigate(['/']);
        } else { console.error('Redirecting to /'); }
      }
    });
  }

  /**
   * Call User Service Middleware for user data
   * If successful call checkRedirect()
   */
  private getUserData() {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
      this.userservice.getUser(this.id, this.user_id).subscribe( (res: User) => {
        this.progress = res.progress;
        this.checkRedirect();
      },
      (err) => {
        if (this.window.nativeWindow.confirm('Invalid User')) {
          if (!isDevMode()) { this.router.navigate(['survey', this.id ]);
          } else { console.error('Redirecting to /survey/:id'); }
        }
      });
    });
  }

  /**
   *  Automatically redirect if this user is on the wrong page
   */
  private checkRedirect() {
    if (this.progress !== 0) {
      if (this.window.nativeWindow.confirm('Error: Wrong Page! Redirecting... ')) {
        switch (this.progress) {
          case 1:
            if (!isDevMode()) {
              this.router.navigate(['q-sort', this.id],
              {
                skipLocationChange: true,
                queryParams: { user_id: this.user_id }
              });
            } else {
              console.error('Redirecting to q-sort/:id');
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

  /**
   * Increase current_index (for statement display)
   */
  increaseIndex() {
    if (this.current_index + 1 < this.statements_sort.length) {
      this.current_index++;
    }
  }

  /**
   * Decrease current_index (for statement display)
   */
  decreaseIndex() {
    if (this.current_index > 0) {
      this.current_index--;
    }
  }

  /**
   * Add statement into disagree array on click
   */
  onDisagreeClick() {
    const selected = this.statements_sort[this.current_index];
    // DEBUG
    // console.log(selected);
    if (selected !== undefined) {
      this.removeDisagree(selected);
      this.disagree.unshift(selected);
      this.removeStatement(selected);
      this.removeNeutral(selected);
      this.removeAgree(selected);
    }
  }

  /**
   * Add statement into neutral array on click
   */
  onNeutralClick() {
    const selected = this.statements_sort[this.current_index];
    // DEBUG
    // console.log(selected);
    if (selected !== undefined) {
      this.removeNeutral(selected);
      this.neutral.unshift(selected);
      this.removeStatement(selected);
      this.removeDisagree(selected);
      this.removeAgree(selected);
    }
  }

  /**
   * Add statement into agree array on click
   */
  onAgreeClick() {
    const selected = this.statements_sort[this.current_index];
    // DEBUG
    // console.log(selected);
    if (selected !== undefined) {
      this.removeAgree(selected);
      this.agree.unshift(selected);
      this.removeStatement(selected);
      this.removeDisagree(selected);
      this.removeNeutral(selected);
    }
  }

  /**
   * Add statement into disagree array on drop
   */
  onDisagreeDrop(e: any) {
    this.removeDisagree(e.dragData);
    this.disagree.unshift(e.dragData);
    this.removeStatement(e.dragData);
    this.removeNeutral(e.dragData);
    this.removeAgree(e.dragData);
  }

  /**
   * Add statement into neutral array on drop
   */
  onNeutralDrop(e: any) {
    this.removeNeutral(e.dragData);
    this.neutral.unshift(e.dragData);
    this.removeStatement(e.dragData);
    this.removeDisagree(e.dragData);
    this.removeAgree(e.dragData);
  }

  /**
   * Add statement into agree array on drop
   */
  onAgreeDrop(e: any) {
    this.removeAgree(e.dragData);
    this.agree.unshift(e.dragData);
    this.removeStatement(e.dragData);
    this.removeDisagree(e.dragData);
    this.removeNeutral(e.dragData);
  }

  /**
   * Remove statement from statement array
   * @param e event object
   */
  removeStatement(e: any) {
    this.statements_sort.forEach( (item, index) => {
      if (item === e) { this.statements_sort.splice(index, 1); }
    });
    if (this.current_index >= this.statements_sort.length) {
      --this.current_index;
    }
  }

  /**
   * Remove statement from disagree array
   * @param e event object
   */
  removeDisagree(e: any) {
    this.disagree.forEach((item, index) => {
      if (item === e) {
        this.disagree.splice(index, 1);
      }
    });
  }

  /**
   * Remove statement from neutral array
   * @param e event object
   */
  removeNeutral(e: any) {
    this.neutral.forEach( (item, index) => {
      if (item === e) {
        this.neutral.splice(index, 1);
      }
    });
  }

  /**
   * Remove statement from agree array
   * @param e event object
   */
  removeAgree(e: any) {
    this.agree.forEach( (item, index) => {
      if (item === e) {
        this.agree.splice(index, 1);
      }
    });
  }

  /**
   * Function called when all statements have been removed from the deck.
   * Submits the collated data => QMd UserService MW
   * If successful, goes to Q-Sort page.
   */
  publishSortContinue() {
    /* DEBUG
     * if ( isDevMode() ) {
     *   console.log(`Agree: ${this.agree}`);
     *   console.log(`Neutral: ${this.neutral}`);
     *   console.log(`Disagree: ${this.disagree}`);
     * }
     */
    if (!this.submitted) {
      this.submitted = true;
      const input = {
        sort_agree: this.agree,
        sort_neutral: this.neutral,
        sort_disagree: this.disagree
      };
      this.userservice.updateUser(this.id, this.user_id, input).subscribe( res => {
        this.router.navigate(['q-sort', this.id], {
          skipLocationChange: !isDevMode(),
          queryParams: {
            user_id: this.user_id
          }
        });
      },
      err => {
        console.error(err);
        if (this.window.nativeWindow.confirm('Update Failed. An error has occured.')) {}
      });
    }
  }

  /** Reset the page */
  refresh(): void {
    window.location.reload();
  }

  ngOnInit() {
  }

}
