import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { SurveyService } from 'src/app/survey.service';
import { WindowWrap } from 'src/app/window-wrapper';
import { Survey } from 'src/app/models';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  id: string;
  user_id: string;
  survey_id: string;

  constructor(private route: ActivatedRoute,
    private surveyservice: SurveyService,
    private userservice: UserService,
    private router: Router, private window: WindowWrap) {
      this.route.params.subscribe( params => {
        this.survey_id = params['id'];
        this.getUserData();
      });
    }

  // Get data from user service
  private getUserData() {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
    });
  }

  ngOnInit() {
  }

}
