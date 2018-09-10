import { Component, OnInit, Input } from '@angular/core';
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

  ngOnInit() {
    this.angForm.get('private_link').setValue( window.location.hostname + '/start/' + this.survey._id );
  }
}
