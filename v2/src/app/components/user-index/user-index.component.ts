import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../survey.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  id: String;
  valid: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private surveyservice: SurveyService
  ) {
      this.route.params.subscribe(params => {
          this.surveyservice.getSurvey(params['id']).subscribe(res => {
            this.id = params['id'];
            this.surveyservice.getSurvey(this.id);
            this.valid = true;
        });
      });
    }
  // TODO: Placeholder function
  nextPage() {
    const nextPage = `initial-sort/${this.id}`
    this.router.navigate([nextPage]);
  }

  ngOnInit() {
  }

}
