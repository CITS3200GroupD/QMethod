import { isDevMode, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../survey.service';           // QMd Survey Service MW
import { UserService } from '../../user.service';               // QMd User Service MW
import { Survey, User } from '../../models';
import { WindowWrap } from '../../window-wrapper';



@Component({
  selector: 'app-initial-sort',
  templateUrl: './initial-sort.component.html',
  styleUrls: ['./initial-sort.component.css']
})
export class InitialSortComponent implements OnInit {

  id: string;
  user_id: string;
  survey: Survey;
  statements: string[] = [];
  statements_sort: number[] = [];

  progress: number;
  current_index = 0;
  disagree: number[] = [];
  neutral: number[] = [];
  agree: number[] = [];

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
      this.statements = this.survey.statements;
      for (let i = 0; i < this.statements.length; i++) {
        this.statements_sort.push(i);
      }
      this.getUserData();
    },
    (err) => {
      if (this.window.nativeWindow.confirm('Invalid Survey')) {
        if (!isDevMode()) { this.router.navigate(['/']); }
        else { console.error('Redirecting to /'); }
      }
    });
  }

  // Get data from user service
  private getUserData() {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
      this.userservice.getUser(this.id, this.user_id).subscribe( (res: User) => {
        this.progress = res.progress;
        this.checkRedirect();
      },
      (err) => {
        if (this.window.nativeWindow.confirm('Invalid User')) {
          if (!isDevMode()) { this.router.navigate(['survey', this.id ]); }
          else { console.error('Redirecting to /survey/:id'); }
        }
      });
    });
  }

  // Automatically redirect if this user is on the wrong page
  private checkRedirect() {
    if (this.progress != 0) {
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

  increaseIndex() {
    if (this.current_index + 1 < this.statements_sort.length) {
      this.current_index++;
    }
  }

  decreaseIndex() {
    if (this.current_index > 0) {
      this.current_index--;
    }
  }

  onDisagreeClick() {
    console.log('click');
    const selected = this.statements_sort[this.current_index];
    this.removeDisagree(selected);
    this.disagree.push(selected);
    this.removeStatement(selected);
    this.removeNeutral(selected);
    this.removeAgree(selected);
  }

  onNeutralClick() {
    console.log('click');
    const selected = this.statements_sort[this.current_index];
    this.removeNeutral(selected);
    this.neutral.push(selected);
    this.removeStatement(selected);
    this.removeDisagree(selected);
    this.removeAgree(selected);
  }

  onAgreeClick() {
    console.log('click');
    const selected = this.statements_sort[this.current_index];
    this.removeAgree(selected);
    this.agree.push(selected);
    this.removeStatement(selected);
    this.removeDisagree(selected);
    this.removeNeutral(selected);
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
    this.statements_sort.forEach( (item, index) => {
      if (item == e) { this.statements_sort.splice(index, 1); }
    });
    if (this.current_index >= this.statements_sort.length) {
      --this.current_index;
    }
  }

  removeDisagree(e: any) {
    this.disagree.forEach((item, index) => {
      if (item == e) {
        this.disagree.splice(index, 1);
      }
    });
  }

  removeNeutral(e: any) {
    this.neutral.forEach( (item, index) => {
      if (item == e) {
        this.neutral.splice(index, 1);
      }
    });
  }

  removeAgree(e: any) {
    this.agree.forEach( (item, index) => {
      if (item == e) {
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
    if ( isDevMode() ) {
      console.log(`Agree: ${this.agree}`);
      console.log(`Neutral: ${this.neutral}`);
      console.log(`Disagree: ${this.disagree}`);
    }
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
      if (this.window.nativeWindow.confirm('Update Failed. An error has occured.')) {};
    });
  }

  ngOnInit() {
  }

}
