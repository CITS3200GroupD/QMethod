import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';      // @ng core
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';              // @ng reactive forms
import { WindowWrap } from '../../window-wrapper';                                  // wrapper for window
import * as Settings from '../../../../config/Settings';                            // QMd Settings

@Component({
  selector: 'app-edit-forms',
  templateUrl: './edit-forms.component.html',
  styleUrls: ['./edit-forms.component.css']
})
/**
 * Subcomponent handling forms for EditComponent
 */
export class EditFormsComponent implements OnInit {

  /** The maximum number of fields*/
  FIELDS_LIMIT = Settings.FIELDS_LIMIT || 10;
  /** The maximum character length of a statement */
  CHAR_LIMIT = Settings.CHAR_LIMIT || 350;
  /** The maximum number of statements */
  STATE_LIMIT = Settings.STATE_LIMIT || 80;
  /** Field titles */
  fields: string[] = [];

  /**
   * Input function called by parent component to set fields var.
   * @param fields_input A string array of field titles
   */
  @Input() set fields_input(fields_input: string[]) {
    // Fix for calling of input with undefined value
    if (fields_input && fields_input.length < 11) {
      this.fields = fields_input;
    }
    // TODO: Better checks for >FORMS_LIMIT, error messages thrown, etc.
  }
  /** Input called by parent component to set variable to disable editing */
  @Input() disabled: boolean;
  /** Output callback to send to parent component to inform of changes to fields var. */
  @Output() fields_out = new EventEmitter<string[]>();

  /** @ng reactive form */
  angForm: FormGroup;

  /**
   * Constructor for EditFormsComponent
   * @param fb @ng reactive form builder object
   * @param window Wrapper for window
   */
  constructor(private fb: FormBuilder, private window: WindowWrap) {
      this.createForm();
    }

  /**
   * @ng reactive form initialisation
   */
  private createForm(): void {
    this.angForm = this.fb.group({
      field: ['', Validators.required ]
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
   * Add a field to the current survey and sync with parent component.
   * @param field The string for the field to be added
   */
  addField(field: string): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else if (!this.fields) {
      this.throwError('Invalid fields');
    } else if (this.fields && this.fields.length > 10) {
      this.throwError('Too many fields');
    } else {
      this.fields.push(field);
      this.fields_out.emit(this.fields);
    }
  }

  /**
   * Delete a field from the current survey and sync with parent component.
   * @param field The string for the field to be added
   */
  deleteField(index: number): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else if (!this.fields) {
      this.throwError('Invalid fields');
    } else {
      if (this.window.nativeWindow.confirm('Are you sure you wish to delete this field?')) {
        this.fields.splice(index, 1);
        this.fields_out.emit(this.fields);
      }
    }
  }

  /** Function called on init */
  ngOnInit() {
  }
}
