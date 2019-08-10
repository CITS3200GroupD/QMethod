import {Component, ViewChild, Input, OnInit} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-instructions',
  templateUrl: './modal-instructions.html'
})

export class NgbdModalInstructionsComponent implements OnInit {
  closeResult: string;
  instructions = [];

  @Input() set ins_in(ins_in: string[]) {
      this.instructions = ins_in;
      this.open(this.content);
  }

  @ViewChild('content') private content;

  constructor(private modalService: NgbModal) {}

  open(content: any) {
    if (this.instructions.length > 0 ) {
      setTimeout(() => {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      },
      0);
    }
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
  }
}
