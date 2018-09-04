import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Survey } from './Survey';
import KurtOptions from './Survey';
import { SurveyService } from '../../survey.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  kurtOptions = KurtOptions;

  surveys: Survey[];

  surveys2: {
      id: Number;
      survey_name: String;
      survey_kurt: String;
  }[];

  constructor(private surveyservice: SurveyService, private router: Router) { }

  deleteSurvey(id) {
    if (window.confirm('Are you sure you wish to delete this survey?')){
      this.surveyservice.deleteSurvey(id).subscribe(res => {
          this.ngOnInit();
          console.log('Deleted');
      });
    }
  }

  ngOnInit() {
    this.surveyservice
      .getSurveys()
      .subscribe((data: Survey[]) => {
      this.surveys = data;
    });
  }
}