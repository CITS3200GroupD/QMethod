import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-edit-grid',
  templateUrl: './edit-grid.component.html',
  styleUrls: ['./edit-grid.component.css']
})
export class EditGridComponent implements OnInit {

  TemporaryArray = [ 2, 2, 2, 4, 5, 4, 6, 5, 4, 3, 2];
  TemporaryMaxArray = [ 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2];
  totalStatements: number;
  temp_label_x = 5;
  temp_range_y = 7;
  
  Arr = Array;

  @Input() range_x: number;
  @Input() label_x: number;
  @Input() range_y: number;

  @Output() status = new EventEmitter<boolean>();

  constructor() {}

  addBtn(col, row) {
    this.TemporaryArray[col] += 1;
    console.log(col.toString()+','+row.toString());
    console.log(this.TemporaryArray);
    this.totalStatements = this.TemporaryArray.reduce((a, b) => a + b, 0)
    this.ngOnInit();
  }

  deleteBtn(col, row) {
    this.TemporaryArray[col] -= 1;
    console.log(col.toString()+','+row.toString());
    console.log(this.TemporaryArray);
    this.ngOnInit();
  }

  ngOnInit() {
  }

}
