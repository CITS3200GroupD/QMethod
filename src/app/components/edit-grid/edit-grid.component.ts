import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { GridTemplates } from '../../models';

@Component({
  selector: 'app-edit-grid',
  templateUrl: './edit-grid.component.html',
  styleUrls: ['./edit-grid.component.css']
})
export class EditGridComponent implements OnInit {

  private cols_templates = GridTemplates;

  // init: boolean;
  private disabled: boolean;
  grid: number[];
  max_grid: number[];

  offset: number;
  max_rows: number;

  grid_statements_count: number;
  num_statements: number;

  arr = Array;


  // Seperated input as this is called when range input drop-down menu is changed
  // TODO: might cause issues if range is never called
  @Input('survey')
  set survey(survey: any) {
    try {
      this.num_statements = survey.statements.length;
      this.grid = survey.cols;
    } catch (e) {
      if (e instanceof TypeError) {
      } else { throw e; }
    }

    this.disabled = survey.publish;

    this.offset = Math.floor( survey.range / 2 );
    this.max_rows = this.offset + 2;

    this.cols_templates.forEach( (item) => {
      const value = item.val;
      if (Number(value) == survey.range) {
        this.max_grid = Array.from(item.default_cols);
        this.updateStatementCount();
        // this.ngOnInit();
      }
    });
  }

  // Seperated input as this is called when range input drop-down menu is changed
  // TODO: might cause issues if range is called after survey
  @Input('range')
  set range(range: number) {
    this.offset = Math.floor( range / 2 );
    this.max_rows = this.offset + 2;

    this.cols_templates.forEach( (item) => {
      const value = item.val;
      if (Number(value) == range) {
        this.max_grid = Array.from(item.default_cols);
        this.grid = Array.from(this.max_grid);
        this.updateStatementCount();
        this.output_grid.emit(this.grid);
        // this.ngOnInit();
      }
    });
  }

   // Seperated input as this is called when range input drop-down menu is changed
  // TODO: might cause issues if range is called after survey
  @Input('statements_length')
  set statements_length(statements_length: number) {
    if (statements_length) {
      this.num_statements = statements_length;
      this.updateStatementCount();
    }
  }

  @Output() output_grid = new EventEmitter<number[]>();
  @Output() is_valid = new EventEmitter<boolean>();

  constructor() {
  }

  private throwError(error): void {
    try {
      throw new Error(error);
    } catch (e) {
      alert(`${e.name}: ${e.message}`);
    }
  }

  addBtn(col: number, row: number): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      this.grid[col] += 1;
      // console.log(col.toString()+','+row.toString());
      // console.log(this.grid);
      this.updateStatementCount();
      this.output_grid.emit(this.grid);
      this.ngOnInit();
    }
  }

  deleteBtn(col: number, row: number): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      this.grid[col] -= 1;
      // console.log(col.toString()+','+row.toString());
      // console.log(this.grid);
      this.updateStatementCount();
      this.output_grid.emit(this.grid);
      this.ngOnInit();
    }
  }

  private updateStatementCount(): void {
    this.grid_statements_count = this.grid.reduce((a, b) => a + b, 0);
    if (this.grid_statements_count != this.num_statements) {
      this.is_valid.emit(false);
    } else {
      this.is_valid.emit(true);
    }
  }

  ngOnInit(): void {}

}
