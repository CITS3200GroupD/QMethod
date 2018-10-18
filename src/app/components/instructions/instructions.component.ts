import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  survey_id: string;

  constructor( private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe( params => {
      this.survey_id = params['id'];
      console.log(this.survey_id);
    });
  }

  goNext() {
    this.router.navigate(['/registration', this.survey_id], { skipLocationChange: !isDevMode()});
  }

  ngOnInit() {
  }

}
