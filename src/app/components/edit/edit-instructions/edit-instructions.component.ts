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
  instructions_page = [1, 1, 1, 1, 1];
  /** Names of pages */
  page_names = Settings.INS_PAGE_NAMES;

  /** Character limit for each statement */
  INS_CHAR_LIMIT = Settings.INS_CHAR_LIMIT;
  /** The maximum number of ins*/
  INS_LIMIT = Settings.INS_LIMIT;
  /** Pagination variable */
  PAGINATE_LISTS = Settings.PAGINATE_LISTS;

  /** Field titles */
  instructions: string[][] = [];

  /**
   * Input function called by parent component to set ins var.
   * @param ins_input A string array of field titles
   */
  @Input() set ins_input(ins_input: string[][]) {
    // Fix for calling of input with undefined value
    // if (ins_input && ins_input.length < (this.INS_LIMIT + 1)) {
      this.instructions = ins_input;
    // }
    // TODO: Better checks for >FORMS_LIMIT, error messages thrown, etc.
  }
  /** Input called by parent component to set variable to disable editing */
  @Input() disabled: boolean;
  /** Output callback to send to parent component to inform of changes to ins var. */
  @Output() ins_out = new EventEmitter<string[][]>();

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
      edit_ins: ['', Validators.required ],
      edit_page: ['', Validators.required ]
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
   * @param page_index The page the instruction is on
   * @param index Index of the instruction to be modified
   */
  open(content, page_index: number, index: number): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-edit-instruction'});
    this.editForm.get('edit_ins').setValue(this.instructions[page_index][index]);
    this.editForm.get('edit_page').setValue(page_index);
    this.edit_index = index;
  }

  /**
   * Add an instruction to the current survey and sync with parent component.
   * @param page_index The page to add this instruction to
   * @param field The instruction to be added
   */
  addIns(page_index: number, field: string): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else if (!this.instructions[page_index]) {
      this.throwError('Invalid instructions');
    } else if (this.instructions[page_index] && this.instructions[page_index].length > this.INS_LIMIT[page_index]) {
      this.throwError('Too many instructions');
    } else {
      this.instructions[page_index].push(field);
      this.ins_out.emit(this.instructions);
    }

    if ((this.instructions_page[page_index] * this.PAGINATE_LISTS) < this.instructions[page_index].length) {
      this.instructions_page[page_index] = Math.ceil(this.instructions[page_index].length / this.PAGINATE_LISTS);
    }
  }

  /**
   * Edit field (and sync with database)
   * @param page_index The page the instruction is on
   * @param field The instruction to be edited
   */
  editIns(page_index: number, field: string): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      this.instructions[page_index][this.edit_index] = field;
      this.ins_out.emit(this.instructions);
    }
  }

  /**
   * Delete a field from the current survey and sync with parent component.
   * @param page_index The page the instruction is on
   * @param ins_index The index of the instruction to be deleted
   */
  deleteIns(page_index: number, ins_index: number): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else if (!this.instructions[0]) {
      this.throwError('Invalid ins');
    } else {
      if (this.window.nativeWindow.confirm('Are you sure you wish to delete this instruction?')) {
        this.instructions[page_index].splice(ins_index, 1);
        this.ins_out.emit(this.instructions);
      }
    }
  }

  /** Function called on init */
  ngOnInit() {
  }
}
