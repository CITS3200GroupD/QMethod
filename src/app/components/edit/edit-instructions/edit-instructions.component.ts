import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';      // @ng core
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';              // @ng reactive forms
import { WindowWrap } from 'src/app/window-wrapper';                                  // wrapper for window
import * as Settings from 'config/Settings';                                        // QMd Settings
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';                              // ngbmodal

@Component({
  selector: 'app-edit-instructions',
  templateUrl: './edit-instructions.component.html',
  styleUrls: ['./edit-instructions.component.css']
})
export class EditInstructionsComponent implements OnInit {

  /** Var for current page for pagination */
  instructions_page = 1;

  /** Character limit for each statement */
  INS_CHAR_LIMIT = Settings.INS_CHAR_LIMIT;
  /** The maximum number of ins*/
  INS_LIMIT = Settings.INS_LIMIT || 20;
  /** Pagination variable */
  PAGINATE_LISTS = Settings.PAGINATE_LISTS;

  /** Field titles */
  ins: string[] = [];

  /**
   * Input function called by parent component to set ins var.
   * @param ins_input A string array of field titles
   */
  @Input() set ins_input(ins_input: string[]) {
    // Fix for calling of input with undefined value
    if (ins_input && ins_input.length < (this.INS_LIMIT + 1)) {
      this.ins = ins_input;
    }
    // TODO: Better checks for >FORMS_LIMIT, error messages thrown, etc.
  }
  /** Input called by parent component to set variable to disable editing */
  @Input() disabled: boolean;
  /** Output callback to send to parent component to inform of changes to ins var. */
  @Output() ins_out = new EventEmitter<string[]>();


  /** Edit Index */
  edit_index: number;
  /** @ng reactive form */
  angForm: FormGroup;
  /** @ng reactive form for edit */
  editForm: FormGroup;
  /**
   * Constructor for EditFormsComponent
   * @param fb @ng reactive form builder object
   * @param window Wrapper for window
   * @param modalService Service for ngModal
   */
  constructor(private fb: FormBuilder,
    private window: WindowWrap,
    private modalService: NgbModal) {
      this.createForm();
    }
  /**
   * @ng reactive form initialisation
   */
  private createForm(): void {
    this.angForm = this.fb.group({
      field: ['', Validators.required ]
    });
    this.editForm = this.fb.group({
      edit_field: ['', Validators.required ]
    });
  }

  /**
   * Throw (and catch) error to display to user and print to console
   * @param error The error to be displayed
   */
  private throwError(error): void {
    try {
      throw new Error(error);
    } catch (e) {
      alert(`${e.name}: ${e.message}`);
      console.error(error);
    }
  }


  /**
   * Open and display modal
   * @param content Modal to be displayed
   * @param index Index of the statement to be modified
   */
  open(content, index): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-edit-statement'});
    this.editForm.get('edit_field').setValue(this.ins[index]);
    this.edit_index = index;
  }

  /**
   * Add a field to the current survey and sync with parent component.
   * @param field The string for the field to be added
   */
  addIns(field: string): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else if (!this.ins) {
      this.throwError('Invalid ins');
    } else if (this.ins && this.ins.length > this.INS_LIMIT) {
      this.throwError('Too many ins');
    } else {
      this.ins.push(field);
      this.ins_out.emit(this.ins);
    }

    if ((this.instructions_page * this.PAGINATE_LISTS) < this.ins.length) {
      this.instructions_page = Math.ceil(this.ins.length / this.PAGINATE_LISTS);
    }
  }

  /**
   * Edit field (and sync with database)
   * @param field Field input to update statement
   */
  editIns(field: string): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      this.ins[this.edit_index] = field;
      this.ins_out.emit(this.ins);
    }
  }

  /**
   * Delete a field from the current survey and sync with parent component.
   * @param field The string for the field to be added
   */
  deleteIns(index: number): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else if (!this.ins) {
      this.throwError('Invalid ins');
    } else {
      if (this.window.nativeWindow.confirm('Are you sure you wish to delete this instruction?')) {
        this.ins.splice(index, 1);
        this.ins_out.emit(this.ins);
      }
    }
  }

  /** Function called on init */
  ngOnInit() {
  }
}
