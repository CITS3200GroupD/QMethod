import { Component, OnInit } from '@angular/core';                      // @ng core
import { ActivatedRoute, Router } from '@angular/router';               // @ng router
import { SurveyService } from '../../survey.service';                   // QMd Survey Service MW
import { UserService } from '../../user.service';                       // QMd User Service MW
import { Survey, User } from '../../models';                            // QMd Models
import { WindowWrap } from '../../window-wrapper';                      // wrapper for window

@Component({
  selector: 'app-admin-user-view',
  templateUrl: './admin-user-view.component.html',
  styleUrls: ['./admin-user-view.component.css']
})
/**
 * Component for viewing user data
 */
export class AdminUserViewComponent implements OnInit {

  /** Questionnaire field strings */
  questionnaire: string[] = [];
  /** Questionnaire answers */
  question_ans: string[] = [];
  /** Registration field strings */
  register: string[] = [];
  /** Registration answers */
  register_ans: string[] = [];
  /** Q-Sort Matrix Post-sort results */
  matrix: number[][] = [];

  /** Offset variable (for display) */
  offset = 0;
  /** Survey name (for display) */
  survey_name: string;
  /** Survey ID (for display) */
  survey_id: string;
  /** User ID (for display) */
  user_id: string;

  /**
   * Constructor for Activated Route
   * @param route @ng router
   * @param router @ng ActivatedRoute
   * @param userservice User Service Middleware to communicate with express RESTful API server
   * @param surveyservice Survey Service Middleware to communicate with express RESTful API server
   * @param window wrapper for window
   */
  constructor(private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService,
    private surveyservice: SurveyService,
    private window: WindowWrap) {
      // TODO: Waiting on proper Authentication
      this.userservice.addAuthHeader('true');
      this.surveyservice.addAuthHeader('true');
      // Load url params into object vars, then retrieve data from services.
      this.route.params.subscribe(params => {
        this.survey_id = params['id'];
        this.user_id = params['user_id'];
        this.getSurveyData();
        this.getUserData();
      });
    }

  /**
   * Call User Service Middleware for user data based on object's survey_id and user_id vars.
   * If successful, call getSurveyData() to retreive survey properties.
   */
  private getUserData(): void {
    this.userservice.getUser(this.survey_id, this.user_id).subscribe(
      (res: User) => {
        this.question_ans = res.question_ans;
        this.register_ans = res.register_ans;
        this.matrix = res.matrix;
        this.offset = Math.floor( res.matrix.length / 2 );
        this.checkExport();
      }
    );
  }

  /**
   * Call Survey Service Middleware for survey data.
   * If successful, load data into object and call checkExport() function
   */
  private getSurveyData(): void {
    this.surveyservice.getSurvey(this.survey_id).subscribe(
      (res: Survey) => {
        this.survey_name = res.name;
        this.register = res.register;
        this.questionnaire = res.questionnaire;
      }
    );
  }

  /**
   * Check url paramters for [export], and call print function if true.
   */
  private checkExport() {
    this.route.queryParams.subscribe(params => {
      if (params['export']) {
        setTimeout(() => {
          this.print();
        },
        600);
      }
    });
  }

  /**
   * Print as HTML template
   * from: https://stackoverflow.com/questions/41379274/print-html-template-in-angular-2-ng-print-in-angular-2#41379912
   */
  print(): void {
    let grid_print, reg_print, ques_print, popupWin;
    grid_print = document.getElementById('grid-print').innerHTML;
    reg_print = document.getElementById('reg-print').innerHTML;
    ques_print = document.getElementById('ques-print').innerHTML;
    popupWin = this.window.nativeWindow.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>QMethod Report for Survey: ${this.survey_id} Respondent: ${this.user_id}</title>
          <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"/>
          </style>
          <style>
            .list-group-item { padding-top: 2px; padding-bottom: 2px; }
            p { margin-bottom: 2px; }
          </style>
        </head>

    <body onload="window.print();window.close()">
    <div class="card">
      <div class="card-header">
        <p><b>Survey Name</b> ${this.survey_name}</p>
        <p><b>Survey ID</b> ${this.survey_id}</p>
        <p><b>Respondent ID</b> ${this.user_id}</p>
      </div>
      <div class="card-body">
        <p><b>Q-Sort Grid</b></p>
        ${grid_print}
      </div>
      <div class="card-footer">
        <p><b>Registration</b></p>
        ${reg_print}
        <br>
        <p><b>Questionnaire</b></p>
        ${ques_print}
      </div>
    </div>
    </body>
      </html>`
    );
    popupWin.document.close();
  }

  /**
   * Delete (with confirmation) this user from the survey results (sync with database)
   */
  deleteUser(): void {
    if (this.window.nativeWindow.confirm('Are you sure you wish to delete this user?')) {
      this.userservice.deleteUser(this.survey_id, this.user_id).subscribe(res => {
          // console.log(res);
          this.router.navigate(['results', this.survey_id]);
      });
    }
  }

  ngOnInit(): void {
  }

}
