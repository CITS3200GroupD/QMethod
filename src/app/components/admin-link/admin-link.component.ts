import { isDevMode, Component, OnInit, Input } from '@angular/core';      // @ng core
import { ActivatedRoute } from '@angular/router';                         // @ng router
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';                    // ng-bootstrap addon
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';    // @ng reactive form


@Component({
  selector: 'app-admin-link',
  templateUrl: './admin-link.component.html',
  styleUrls: ['./admin-link.component.css']
})
/**
 * Subcomponent AdminLinkComponent to handle display of private link
 */
export class AdminLinkComponent implements OnInit {

  /** Input from parent component for survey data */
  @Input() survey: any = {};      // TODO: Change type to Survey and import QMd Models
  /** @ng reactive form */
  angForm: FormGroup;

  /**
   * Constructor for AdminLinkComponent
   * @param modalService Service for ngb-modal
   * @param router @ng router
   * @param fb @ng reactive forms
   */
  constructor(private modalService: NgbModal,
    private router: ActivatedRoute,
    private fb: FormBuilder) {
    this.createForm();
  }

  /**
   * @ng reactive form initialisation
   */
  private createForm(): void {
    this.angForm = this.fb.group({
      private_link: [{value: '', disabled: true}, Validators.required ]
   });
  }

  /**
   * Open and display modal
   * @param content Modal to be displayed
   */
  open(content): void {
    if (this.survey.publish) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-private-link'});
    }
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

  /** Function run on init
   * Set ng-reactive form default values
   */
  ngOnInit(): void {
    // Vars set during this stage as we need input from the parent component
    if (isDevMode()) {
      this.angForm.get('private_link').setValue( `localhost:4200/survey/${this.survey._id}`);
    } else {
      this.angForm.get('private_link').setValue( `${window.location.hostname}/survey/${this.survey._id}`);
    }
  }
}
