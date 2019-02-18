import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Survey } from 'src/app/models';
import { SurveyService } from 'src/app/survey.service';           // QMd Survey Service MW
import { WindowWrap } from 'src/app/window-wrapper';
import * as Settings from 'config/Settings';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  survey_id: string;
  instructions: string[] = [];

  constructor( private route: ActivatedRoute,
    private router: Router,
    private surveyservice: SurveyService,
    private window: WindowWrap
  ) {
    this.route.params.subscribe( params => {
      this.survey_id = params['id'];
      // DEBUG
      // console.log(this.survey_id);
    });
    this.getSurveyData();
  }


  private getSurveyData(): void {
    this.surveyservice.getSurvey(this.survey_id).subscribe(
      (res: Survey) => {
        this.instructions = res.instructions[Settings.INS_INSTRUCTIONS];
      });
  }

  goNext() {
    if (this.window.nativeWindow.confirm(Settings.CONFIRMATION_TNC)) {
        this.router.navigate(['/registration', this.survey_id], { skipLocationChange: !isDevMode()});
      }
  }

  ngOnInit() {
  }

}
