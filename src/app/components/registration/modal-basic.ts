import {Component, ViewChild } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { WindowWrap } from '../../window-wrapper';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-ngbd-modal-basic-registration',
  template:
  `<ng-template #content let-modal>
     <div class="modal-body">
      <p>
      Your User ID is {{ user_id }} and Survey ID is {{ survey_id }}.
      Please record this for future reference.
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="modal.close()">OK</button>
    </div>

</ng-template>`
})

export class NgbdModalBasicRegistrationComponent {
  closeResult: string;

  @ViewChild('content') private content;

  id: string;
  user_id: string;
  survey_id: string;

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private window: WindowWrap) {
      this.route.params.subscribe( params => {
        this.survey_id = params['id'];
        this.getUserData();
      });
    }

  // Get data from user service
  private getUserData() {
    this.route.queryParams.subscribe(params => {
      this.user_id = params['user_id'];
    });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
