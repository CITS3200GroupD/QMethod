import { Component, OnInit, isDevMode } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { SurveyService } from 'src/app/survey.service';
import { WindowWrap } from 'src/app/window-wrapper';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Survey } from 'src/app/models';
import * as Settings from 'config/Settings';                // QMd Settings
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
/** Component for the registration page */
export class RegistrationComponent implements OnInit {
  /** Maximum field description character limit */
  FIELD_NAME_LIMIT = Settings.FIELD_NAME_LIMIT;
  /** ID of the survey */
  survey_id: string;
  /** ID of the user */
  user_id: string;
  /** @ng reactive form group */
  reg_fg: FormGroup;
  /** @ng reactive form array */
  reg_fa: FormArray;

  /** SubmitOnce flag */
  submitted = false;

  instructions: string[] = [];

  constructor( private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private surveyservice: SurveyService,
    private userservice: UserService,
    private window: WindowWrap,
    private modalService: NgbModal) {
      this.route.params.subscribe( params => {
        this.survey_id = params['id'];
      });
      this.getSurveyData();
      this.createForm();
    }

  /**
   * Get data from survey service
   */
  private getSurveyData(): void {
    this.surveyservice.getSurvey(this.survey_id).subscribe(
      (res: Survey) => {
        this.instructions = res.instructions[Settings.INS_CONFIRM];
        // Using registration field array as a reference, loop through and init new field objects to the form array
        res.register.forEach((field) => {
          this.reg_fa.push(this.createField(field));
        });
      },
      err => {
        console.error(err);
        this.window.nativeWindow.confirm('Invalid Survey');
        // TODO: Redirect
      }
    );
  }

  /** @ng reactive forms init */
  private createForm(): void {
    this.reg_fg = this.fb.group({
      fields: this.fb.array([])
    });
    // DEBUG
    // console.log(this.reg_fg);
    this.reg_fa = this.reg_fg.get('fields') as FormArray;
  }

  /** @ng reaction form array init */
  private createField(field: string): FormGroup {
    return this.fb.group({
      question: field,
      answer: ['', Validators.required]
    });
  }

  /**
   * A function to extract the necessary information needed to pass onto the user service
   * @returns array to pass on as input to user service or null if invalid
   */
  private getResponse(): string[] {
    const return_array = [];
    let invalid = false;
    this.reg_fa.value.forEach( (object) => {
      if (object.answer === '') {
        invalid = true;
      } else {
        return_array.push(object.answer);
      }
    });
    return (invalid ? null : return_array);
  }

  /**
   * A function to submit the registration information and create a new user.
   */
  addUser(content: any): void {
    // Call getResponse
    if (!this.submitted) {
      this.submitted = true;
      const registration_info = this.getResponse();
      if (registration_info) {
        this.route.params.subscribe(params => {
          this.userservice.addUser(params['id'], registration_info).subscribe(
          (res: string) => {
            this.user_id = res;
            this.modalService.open(content, {ariaLabelledBy: 'modal-registation'}).result.then(
              (result) => {
                this.nextPage();
            }, (reason) => {
                this.nextPage();
            });
          });
        });
      } else {
        // Display Error to User
        console.error('Invalid Response');
        this.window.nativeWindow.confirm('Invalid Submission');
      }
    }
  }

  nextPage() {
    this.router.navigate(['initial-sort', this.survey_id],
      {
        skipLocationChange: !isDevMode(),
        queryParams: {
          user_id: this.user_id
        }
      }
    );
  }

  /**
   * Copy input to clipboard
   * Sourced from: https://stackoverflow.com/questions/36328159/how-do-i-copy-to-clipboard-in-angular-2-typescript
   * @param input String input to be copied to clipboard
   */
  copy(input: string): void {

    const selBox = document.createElement('textarea');

    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = input;

    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();

    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  ngOnInit(): void {
  }

}
