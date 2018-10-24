import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';    // @ng core
import { GridTemplates } from '../../models';                                     // QMd Models

@Component({
  selector: 'app-edit-grid',
  templateUrl: './edit-grid.component.html',
  styleUrls: ['./edit-grid.component.css']
})
/**
 * Subcomponent to display Q-Sort Grid editor
 */
export class EditGridComponent implements OnInit {
  /** Default Q-sort grid templates */
  private cols_templates = GridTemplates;

  /** Flag recording init status */
  init = true;
  /** Flag to disable/enable editing */
  disabled: boolean;
  /** Array storing no. of cells in each column */
  grid: number[];
  /** Array storing maximum no. of cells in each column */
  max_grid: number[];

  /** Offset variable (for display) */
  offset: number;
  /** Max rows (for debug) */
  max_rows: number;
  /** Number of cells in grid */
  grid_cell_count: number;
  /** Number of statements (pulled from parent survey component) */
  num_statements: number;

  /** Temporary array */
  arr = Array;

  /**
   * Survey input data, set by parent component
   * when range input drop-down menu is changed
   * TODO: might cause issues if range is never called
   */
  @Input('survey')
  set survey(survey: any) {
    try {
      this.num_statements = survey.statements.length;
      this.grid = survey.cols;
    } catch (e) {
      if (e instanceof TypeError) {
      } else { throw e; }
    }

    if (survey._id !== 'BLANK_SURVEY') {
      this.init = false;
    }
    this.disabled = ( survey.publish || survey.users.length > 0);

    this.offset = Math.floor( survey.range / 2 );
    this.max_rows = this.offset + 2;

    this.cols_templates.forEach( (item) => {
      const value = item.val;
      if (Number(value) === Number(survey.range)) {
        this.max_grid = Array.from(item.default_cols);
        this.updateStatementCount();
        // this.ngOnInit();
      }
    });
  }

  /**
   * Seperated input for survey range, set by parent component
   * when range input drop-down menu is changed
   * TODO: might cause issues if range is never called
   */
  @Input('range')
  set range(range: number) {
    this.offset = Math.floor( range / 2 );
    this.max_rows = this.offset + 2;

    this.cols_templates.forEach( (item) => {
      const value = item.val;
      if (Number(value) === Number(range)) {
        this.max_grid = Array.from(item.default_cols);
        this.grid = Array.from(this.max_grid);
        this.updateStatementCount();
        this.output_grid.emit(this.grid);
        // this.ngOnInit();
      }
    });
  }

  /**
   * Input for survey statements, set by edit-statements subcomponent
   * when statements array is changed
   */
  @Input('statements_length')
  set statements_length(statements_length: number) {
    if (statements_length) {
      this.num_statements = statements_length;
      this.updateStatementCount();
    }
  }

  /** Output for Q-sort grid parameters when changed by editor */
  @Output() output_grid = new EventEmitter<number[]>();
  /** Output flag for grid validity (versus statement count) */
  @Output() is_valid = new EventEmitter<boolean>();

  /** Constructor for EditGridComponent */
  constructor() {
  }

  /**
   * Throw and catch error for display to user and console
   * @param error The error to be handled
   */
  private throwError(error): void {
    try {
      throw new Error(error);
    } catch (e) {
      alert(`${e.name}: ${e.message}`);
    }
  }

  /**
   * Add cell to the Q-Sort Grid, update statement counts and
   * emit grid to parent component
   * @param col The column the cell belongs to
   * @param row The row the cell belongs to (for debug purposes)
   */
  addBtn(col: number, row: number): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      this.grid[col] += 1;
      /* DEBUG
       * console.log(col.toString()+','+row.toString());
       * console.log(this.grid);
       */
      this.updateStatementCount();
      this.output_grid.emit(this.grid);
      this.ngOnInit();
    }
  }

  /**
   * Delete cell from the Q-Sort Grid, update statement counts and
   * emit grid to parent component
   * @param col The column the cell belongs to
   * @param row The row the cell belongs to (for debug purposes)
   */
  deleteBtn(col: number, row: number): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      this.grid[col] -= 1;
      /* DEBUG
       * console.log(col.toString()+','+row.toString());
       * console.log(this.grid);
       */
      this.updateStatementCount();
      this.output_grid.emit(this.grid);
      this.ngOnInit();
    }
  }

  /**
   * Update Statement count and emit validity
   * to parent component
   */
  private updateStatementCount(): void {
    this.grid_cell_count = this.grid.reduce((a, b) => a + b, 0);
    if (this.grid_cell_count !== this.num_statements) {
      this.is_valid.emit(false);
    } else {
      this.is_valid.emit(true);
    }
  }

  /** Function called on init */
  ngOnInit(): void {}
}
