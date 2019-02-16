import {Component, ViewChild, OnInit} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-basic-initialsort',
  template:
  `<ng-template #content let-modal>
  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">Instructions</h4>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">

  <p *ngFor="let ins of instructions">{{ins}}</p>

  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="modal.close()">OK</button>
  </div>

</ng-template>

<button class="btn btn-sm btn-outline-primary" (click)="open(content)">Instructions</button>`
})

export class NgbdModalBasicInitComponent implements OnInit {

  instructions = [
    'You will be given a series of statements.',
    `Read these statement cards one by one.`,
    `Using your mouse to click and drag, sort the statement cards it
    into one of three given groups that you will see on the screen,
    depending on whether you agree, you don't agree or you are neutral about it.`
  ];
  closeResult: string;

  @ViewChild('content') private content;

  constructor(private modalService: NgbModal) {}

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

  ngOnInit() {
      this.open(this.content);
  }
}
