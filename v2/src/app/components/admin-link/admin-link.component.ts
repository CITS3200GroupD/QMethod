import { isDevMode, Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router'; // ng router
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';  // ng reactive  form


@Component({
  selector: 'app-admin-link',
  templateUrl: './admin-link.component.html',
  styleUrls: ['./admin-link.component.css']
})
export class AdminLinkComponent implements OnInit {

  survey_id: String;

  @Input() survey: any = {};

  // @Input() survey_id: String;

  angForm: FormGroup;

  constructor(private modalService: NgbModal,
    private router: ActivatedRoute,
    private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.angForm = this.fb.group({
      private_link: [{value: '', disabled: true}, Validators.required ]
   });
  }

  open(content) {
    if (this.survey.publish) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-private-link'});
    }
  }
  /**
   * https://stackoverflow.com/questions/36328159/how-do-i-copy-to-clipboard-in-angular-2-typescript
   * Copy 
   * @param input String input
   */
  copy(input) {

    let selBox = document.createElement('textarea');

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

  ngOnInit() {
    if (isDevMode()) {
      this.angForm.get('private_link').setValue( `localhost:4200/survey/${this.survey._id}`);
    } else {
      this.angForm.get('private_link').setValue( `${window.location.hostname}/survey/${this.survey._id}`);
    }
  }
}
