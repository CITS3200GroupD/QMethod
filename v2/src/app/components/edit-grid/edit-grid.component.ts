import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import KurtOptions from '../../Survey';

@Component({
  selector: 'app-edit-grid',
  templateUrl: './edit-grid.component.html',
  styleUrls: ['./edit-grid.component.css']
})
export class EditGridComponent implements OnInit {

  kurtOptions = KurtOptions;

  // init: boolean;
  disabled: boolean;
  grid: number[];
  max_grid: number[];

  offset: number;
  max_rows: number;

  totalStatements: number;
  numState: number;

  arr = Array;

  // Seperated input as this is called when range input drop-down menu is changed
  // TODO: might cause issues if range is never called
  @Input()
  set survey(survey: any) {

    try {
      this.numState = survey.statements.length;
      this.grid = survey.cols;
    } catch (e) {
      if (e instanceof TypeError) {
      } else { throw e; }
    }

    this.disabled = survey.publish;

    this.offset = Math.floor( survey.range / 2 );
    this.max_rows = this.offset + 2;

    this.kurtOptions.forEach( (item) => {
      const value = item.val;
      if (Number(value) == survey.range) {
        this.max_grid = Array.from(item.defaultGrid);
        this.totalStatements = this.grid.reduce((a, b) => a + b, 0);
        this.ngOnInit();
      }
    });
  }

  // Seperated input as this is called when range input drop-down menu is changed
  // TODO: might cause issues if range is called after survey
  @Input()
  set range(range: number) {
    this.offset = Math.floor( range / 2 );
    this.max_rows = this.offset + 2;

    this.kurtOptions.forEach( (item) => {
      const value = item.val;
      if (Number(value) == range) {
        this.max_grid = Array.from(item.defaultGrid);
        this.grid = Array.from(this.max_grid);  
        this.totalStatements = this.grid.reduce((a, b) => a + b, 0);
        this.output_grid.emit(this.grid);
        this.ngOnInit();
      }
    });
  }

  @Output() output_grid = new EventEmitter<number[]>();

  constructor() {
    console.log("constructor");
  }

  addBtn(col, row) {
    if (!this.disabled) {
      this.grid[col] += 1;
      // console.log(col.toString()+','+row.toString());
      // console.log(this.grid);
      this.totalStatements = this.grid.reduce((a, b) => a + b, 0);
      // console.log( this.totalStatements );
      this.output_grid.emit(this.grid);
      this.ngOnInit();
    } else {
      try {
        throw new Error('Attempted to update a published server');
      } catch (e) {
        alert(e.name + ': ' + e.message);
      }
    }
  }

  deleteBtn(col, row) {
    if (!this.disabled) {
      this.grid[col] -= 1;
      // console.log(col.toString()+','+row.toString());
      // console.log(this.grid);
      this.totalStatements = this.grid.reduce((a, b) => a + b, 0);
      // console.log( this.totalStatements );
      this.output_grid.emit(this.grid);
      this.ngOnInit();
    } else {
      try {
        throw new Error('Attempted to update a published server');
      } catch (e) {
        alert(e.name + ': ' + e.message);
      }
    }
  }

  ngOnInit() {}

}
