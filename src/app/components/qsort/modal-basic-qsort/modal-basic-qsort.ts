import {Component, ViewChild, Input, OnInit} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-basic-qsort',
  templateUrl: './modal-basic-qsort.html'
})

export class NgbdModalBasicQsortComponent implements OnInit {
  closeResult: string;
  instructions = [];

  @Input() set ins_in(ins_in: string[]) {
    // Fix for calling of input with undefined value
      this.instructions = ins_in;
    // TODO: Better checks for >FORMS_LIMIT, error messages thrown, etc.
  }

  @ViewChild('content') private content;

  constructor(private modalService: NgbModal) {}

  open(content: any) {
    if (this.instructions.length > 0 ) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
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
    this.open(this.content);
 }
}
