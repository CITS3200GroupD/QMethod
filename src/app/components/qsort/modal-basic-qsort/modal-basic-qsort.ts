import {Component, ViewChild, OnInit} from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-basic-qsort',
  template:
  `<ng-template #content let-modal>
  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">Instructions</h4>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">

  <p> You will be shown the statements again, this time divided into the groups you sorted in step 2.
  </p>

  <p>
    Click on statements from the three groups, and drag them into empty spaces on the grid with your mouse.
    You should sort the statements out on the given graph from a +5 (most agree) to a -5 (least agree) scale.
    You may swap already placed statements in the grid by clicking and dragging.
  </p>

  <p>
    Alternatively you may click on one of the statement groups (agree, disagree, neutral) and then click an empty space
    on the grid to place the top most statement into that empty space. The currently selected group is indicated by the tick.
  </p>



  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-dark" (click)="modal.close()">Ok</button>
  </div>

</ng-template>

<button class="btn btn-sm btn-outline-secondary" (click)="open(content)">Help</button>

<hr>`
})

export class NgbdModalBasicQsortComponent implements OnInit {
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
