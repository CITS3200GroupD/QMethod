import { Component, OnInit } from '@angular/core';
import { Survey } from './Survey';
import { SurveyService } from '../../survey.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  surveys: Survey[];

  constructor(private surveyservice: SurveyService) { }

  deleteSurvey(id) {
    this.surveyservice.deleteSurvey(id).subscribe(res => {
      console.log('Deleted');
    });
  }

  ngOnInit() {
    this.surveyservice
      .getSurveys()
      .subscribe((data: Survey[]) => {
      this.surveys = data;
    });
  }
}