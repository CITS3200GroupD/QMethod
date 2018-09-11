import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Survey } from '../../Survey';
import { SurveyService } from '../../survey.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  surveys: Survey[];

  constructor(private surveyservice: SurveyService,
    private router: Router
  ) {}

  deleteSurvey(id) {
    if (window.confirm('Are you sure you wish to delete this survey?')) {
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
