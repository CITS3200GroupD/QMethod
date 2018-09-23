import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  // TODO: Call SurveyService API and ensure that this is actually a valid survey ID
  survey_id: string;

  constructor( private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe( params => {
      this.survey_id = params['id'];
      console.log(this.survey_id);
    });
  }

  ngOnInit() {
  }

}
