import { isDevMode, Component, OnInit, Pipe, PipeTransform } from '@angular/core'; // ng core
import { Router } from '@angular/router';                                          // ng router
import { Survey } from '../../models';                                             // QMd Models - Survey
import { SurveyService } from '../../survey.service';                              // QMd Survey Service MW
import { WindowWrap } from '../../window-wrapper';                                 // wrapper for window
// import { ValidSurveyList } from '../../testing/Testing';
import * as Settings from '../../../../config/Settings';                           // QMd Settings

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

/**
 * Component for handling the admin interface's index page
 */
export class AdminComponent implements OnInit {
  /** The maximum number of Surveys to display per page */
  PAGINATE_TABLES = Settings.PAGINATE_TABLES;

  /** Var for storing name/id filter for SurveyPipe */
  filter: string;
  /** Var for storing the current page (pagination) */
  page: number;
  /** Var for storing the array of surveys */
  surveys: Survey[];

  /**
   * Constructor for AdminComponent
   * @param surveyservice Survey Service Middleware to communicate with express RESTful API server
   * @param router @ng Router
   * @param window Wrapper for window
   */
  constructor(private surveyservice: SurveyService,
    private router: Router,
    private window: WindowWrap
  ) {
    this.getSurveyData();
  }

  /**
   * Delete a survey from the surveys list (sync with database)
   * @param id UUID of the survey to be deleted
   */
  deleteSurvey(id: string): boolean {
    let status = false;
    if (this.window.nativeWindow.confirm('Are you sure you wish to delete this survey?')) {
      if (isDevMode()) {
        console.log(`SENT => ${id}`);
      }
      this.surveyservice.deleteSurvey(id).subscribe(res => {
        if (isDevMode()) {
          console.log(`RES <= ${res}`);
          console.log(`Deleted Survey ${id}`);
        }
        status = true;
        this.getSurveyData();
      });
      // TODO: Error message if not successful
    }
    return status;
  }

  /**
   * Pull survey list data from SurveyService MW
   */
  private getSurveyData() {
    this.surveyservice.getSurveys().subscribe((surveys_data: Survey[]) => {
      this.surveys = surveys_data;
      // TODO: Error message if not successful
    });

  }

  /** Function run on init */
  ngOnInit(): void {}
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
