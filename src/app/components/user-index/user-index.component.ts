import { isDevMode, Component, OnInit } from '@angular/core';             // @ng-core
import { ActivatedRoute, Router } from '@angular/router';                 // @ng-router
import { FormGroup, FormBuilder, Validators } from '@angular/forms';      // @ng forms
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';                    // ng-bootstrap addon
import { SurveyService } from '../../survey.service';                     // QMd Survey Service MW
import { UserService } from '../../user.service';                         // QMd User Service MW
import { Survey, User } from '../../models';                              // QMd Models
import { WindowWrap } from '../../window-wrapper';                        // wrapper for window

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
/**
 * Component for User Landing Page
 */
export class UserIndexComponent implements OnInit {

  /** Survey ID */
  id: string;
  /** Survey Name */
  survey_name = 'Error';
  /** Validity of Survey */
  valid = false;
  /** Survey Object */
  survey: Survey;
  /** User Object */
  user: User;
  /** ng reactive form */
  angForm: FormGroup;

  /**
   * Constructor for UserIndexComponent
   * @param modalService ng-bootstrap service
   * @param route @ng ActivatedRoute
   * @param router @ng Router
   * @param fb @ng reactive form
   * @param surveyservice QMd Survey Service Middleware
   */
  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private surveyservice: SurveyService,
    private userservice: UserService,
    private window: WindowWrap) {
      this.createForm();
      this.route.params.subscribe(params => {
        this.surveyservice.getSurvey(params['id']).subscribe( (res: Survey) => {
          this.id = params['id'];
          this.survey = res;
          this.survey_name = this.survey.name;
          this.valid = true;
        });
      });
  }

  /**
   * @ng reactive form initialisation
   */
  private createForm(): void {
    this.angForm = this.fb.group({
      user_id: [ '', Validators.required ]
   });
  }

  /**
   * Open and display modal
   * @param content Modal to be displayed
   */
  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-resume-user'});
  }

  /**
   * Find a user from a given user_id, and then go to the relevant page.
   * @param user_id ID of the user to be found
   */
  findUser(user_id): void {
    this.userservice.getUser(this.id, user_id).subscribe( (res: User) => {
      this.user = res;
      switch (this.user.progress) {
        case 0:
          this.router.navigate(['initial-sort', this.id],
          {
            skipLocationChange: !isDevMode(),
            queryParams: { user_id: user_id }
          });
          break;
        case 1:
          this.router.navigate(['q-sort', this.id],
          {
            skipLocationChange: !isDevMode(),
            queryParams: { user_id: user_id }
          });
          break;
        case 2:
          this.router.navigate(['questionnaire', this.id],
          {
            skipLocationChange: !isDevMode(),
            queryParams: { user_id: user_id }
          });
          break;
        case 3:
          // TODO: Results page
          if (this.window.nativeWindow.confirm('You have already completed this survey')) {}
          /*
          this.router.navigate(['submission', this.id],
          {
            skipLocationChange: !isDevMode(),
            queryParams: { user_id: user_id }
          });
          */
          break;
      }
    },
    (err) => {
      // TODO: Error Message
      console.error('User not found');
    });
    this.modalService.dismissAll();
  }

  /**
   * Go to next page (instructions)
   */
  nextPage(): void {
    this.router.navigate(['instructions', this.id], {skipLocationChange: !isDevMode()});
  }

  /** Function run on init
   * Set ng-reactive form default values
   */
  ngOnInit(): void {}

}
