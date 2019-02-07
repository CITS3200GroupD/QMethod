import { Component, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowWrap } from '../../window-wrapper';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  survey_id: string;

  constructor( private route: ActivatedRoute,
    private router: Router,
    private window: WindowWrap
  ) {
    this.route.params.subscribe( params => {
      this.survey_id = params['id'];
      // DEBUG
      // console.log(this.survey_id);
    });
  }

  goNext() {
    if (this.window.nativeWindow.confirm(
      `By clicking OK you acknowledge that you have read all relevant permission forms and agree to their terms and conditions`)) {
        this.router.navigate(['/registration', this.survey_id], { skipLocationChange: !isDevMode()});
      }
  }

  ngOnInit() {
  }

}
