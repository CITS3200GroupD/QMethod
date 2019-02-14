import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';                    // ng-bootstrap addon
import { WindowWrap } from 'src/app/window-wrapper';
import * as Settings from 'config/Settings.js';


@Component({
  selector: 'app-edit-statements',
  templateUrl: './edit-statements.component.html',
  styleUrls: ['./edit-statements.component.css']
})
/**
 * Subcomponent for handling statement editing
 */
export class EditStatementsComponent implements OnInit {
  /** Var for current statement page for pagination */
  statements_page = 1;
  /** Number of statements */
  statements_length = 0;
  /** Character limit for each statement */
  CHAR_LIMIT = Settings.CHAR_LIMIT;
  /** Statement limit */
  STATE_LIMIT = Settings.STATE_LIMIT;
  /** Pagination variable */
  PAGINATE_LISTS = Settings.PAGINATE_LISTS;

  /** Statements for this survey */
  statements: string[];
  /** Edit Index */
  edit_index: number;
  /** Input statements from parent component */
  @Input() set statements_in(statements_in: string[]) {
    // Fix for calling of input with undefined value
    if (statements_in) {
      this.statements = statements_in;
      this.statements_length = this.statements.length;
    }
  }
  /** Input flag for enabling/disabling editing */
  @Input() disabled: boolean;
  /** Output statements on update */
  @Output() statements_out = new EventEmitter<string[]>();

  /** @ng reactive form */
  angForm: FormGroup;
  /** @ng reactive form*/
  editForm: FormGroup;

  /**
   * Constructor for EditStatementsComponent
   * @param route @ng ActivatedRoute
   * @param router @ng Router
   * @param fb @ng reactive forms
   * @param window wrapper for window
   */
  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private window: WindowWrap,
    private modalService: NgbModal) {
      this.createForm();
    }

  /** @ng reactive forms init */
  private createForm(): void {
    this.angForm = this.fb.group({
      statement: ['', Validators.required ]
    });
    this.editForm = this.fb.group({
      edit_statement: ['', Validators.required ]
    });
  }

  /**
   * Open and display modal
   * @param content Modal to be displayed
   * @param index Index of the statement to be modified
   */
  open(content, index): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-edit-statement'});
    this.editForm.get('edit_statement').setValue(this.statements[index]);
    this.edit_index = index;
  }

  /**
   * Throw and catch error to be displayed to user (and console)
   * @param error Error to be handled
   */
  private throwError(error): void {
    try {
      throw new Error(error);
    } catch (e) {
      alert(`${e.name}: ${e.message}`);
    }
  }

  /**
   * Add statement
   * @param statement Statement to be added
   */
  addStatement(statement: string): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      this.statements.push(statement);
      this.statements_out.emit(this.statements);
      this.statements_length = this.statements.length;
    }

    if ((this.statements_page * this.PAGINATE_LISTS) < this.statements.length) {
      this.statements_page = Math.ceil(this.statements.length / this.PAGINATE_LISTS);
    }
  }


  /**
   * Edit statement
   * @param statement_index Index of statement to be deleted
   */
  editStatement(statement: string): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      this.statements[this.edit_index] = statement;
      this.statements_out.emit(this.statements);
    }
  }


  /**
   * Delete statement
   * @param statement_index Index of statement to be deleted
   */
  deleteStatement(statement_index: number): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      if (this.window.nativeWindow.confirm('Are you sure you wish to delete this statement?')) {
        this.statements.splice(statement_index, 1);
        this.statements_out.emit(this.statements);
        this.statements_length = this.statements.length;
      }
    }
  }

  /** Function to be called on init */
  ngOnInit(): void {
  }
}
