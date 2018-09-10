import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import KurtOptions from '../../Survey';

@Component({
  selector: 'app-edit-grid',
  templateUrl: './edit-grid.component.html',
  styleUrls: ['./edit-grid.component.css']
})
export class EditGridComponent implements OnInit {
  
  kurtOptions = KurtOptions;

  // TODO: Backend + Check for publishing 
  disabled: boolean;
  grid: number[];
  max_grid: number[];
  
  offset: number;
  max_rows: number;

  totalStatements: number;
  numState: number;

  arr = Array;

  @Input()
  set survey(survey: any) {
  
    try {
      this.numState = survey.statements.length;
    } catch (e) {
      if (e instanceof TypeError) {}
      else throw e;
    }

    this.disabled = survey.publish;
  }

  @Input()
  set range(range: number) {
    
    this.offset = Math.floor( range/2 );
    this.max_rows = this.offset + 2;

    this.kurtOptions.forEach( (item) => {
      let value = item.val;
      if (parseInt(value) == range) {
        this.max_grid = Array.from(item.defaultGrid);
        this.grid = Array.from(this.max_grid);
        this.totalStatements = this.grid.reduce((a, b) => a + b, 0)
        // console.log(this.max_grid);
      }
    });
  }

  @Output() status = new EventEmitter<boolean>();

  constructor() {
  }

  addBtn(col, row) {
    if (!this.disabled) {
      this.grid[col] += 1;
      // console.log(col.toString()+','+row.toString());
      // console.log(this.grid);
      this.totalStatements = this.grid.reduce((a, b) => a + b, 0)
      console.log( this.totalStatements );
      this.ngOnInit();
    }
    else {
      try {
        throw new Error("Attempted to update a published server");
      } 
      catch (e) {
        alert(e.name+": "+e.message);
      }
    }
  }

  deleteBtn(col, row) {
    if (!this.disabled) {
      this.grid[col] -= 1;
      // console.log(col.toString()+','+row.toString());
      // console.log(this.grid);
      this.totalStatements = this.grid.reduce((a, b) => a + b, 0)
      console.log( this.totalStatements );
      this.ngOnInit();
    }
    else {
      try {
        throw new Error("Attempted to update a published server");
      } 
      catch (e) {
        alert(e.name+": "+e.message);
      }
    }
  }

  ngOnInit() {
  }

}
