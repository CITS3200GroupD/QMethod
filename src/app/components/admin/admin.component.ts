import { isDevMode, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Survey } from '../../models';
import { SurveyService } from '../../survey.service';
import { WindowWrap } from '../../window-wrapper';
import { ValidSurveyList } from '../../testing/Testing';
import * as Settings from '../../../../config/Settings';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  PAGINATE_TABLES = Settings.PAGINATE_TABLES;

  filter: string;
  page: number;
  surveys: Survey[];

  constructor(private surveyservice: SurveyService,
    private router: Router,
    private window: WindowWrap
  ) {}

  deleteSurvey(id: string): boolean {
    let status = false;
    if (this.window.nativeWindow.confirm('Are you sure you wish to delete this survey?')) {
      if (isDevMode()) {
        console.log(`SENT => ${id}`)
      }
      this.surveyservice.deleteSurvey(id).subscribe(res => {
        if (isDevMode()) {
          console.log(`RES <= ${res}`)
          console.log(`Deleted Survey ${id}`);
        }
        status = true;
        this.ngOnInit();
      });
    }
    return status;
  }

  ngOnInit(): void {
    this.surveyservice.getSurveys().subscribe((data: Survey[]) => {
      this.surveys = data;
    });
  }
}
/**
 * Pipe for searching through survey data
 * from https://stackoverflow.com/questions/51649758/contact-list-with-search-filter
 */
@Pipe({name: 'filterSurveyNames'})
export class SurveyPipe implements PipeTransform {
  transform(surveys: Survey[], filter: string): Survey[] {
    if (!surveys) { return null; }
    if (!filter) { return surveys; }

    return surveys.filter(n => n.name.indexOf(filter) >= 0 || n._id.indexOf(filter) >= 0 );
  }
}
