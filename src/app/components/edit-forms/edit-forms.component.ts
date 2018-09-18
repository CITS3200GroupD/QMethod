import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-forms',
  templateUrl: './edit-forms.component.html',
  styleUrls: ['./edit-forms.component.css']
})

export class EditFormsComponent implements OnInit {

  FORMS_LIMIT = 10;
  CHAR_LIMIT = 350;
  STATE_LIMIT = 80;
  fields: string[] = [];

  @Input() set fields_input(fields_input: string[]) {
    // Fix for calling of input with undefined value
    if (fields_input && fields_input.length < 11) {
      this.fields = fields_input;
    }
    // TODO: Better checks for >FORMS_LIMIT
  }
  @Input() disabled: boolean;
  @Output() fields_out = new EventEmitter<string[]>();

  angForm: FormGroup;

  constructor(private fb: FormBuilder) {
      this.createForm();
    }

  private createForm() {
    this.angForm = this.fb.group({
      field: ['', Validators.required ]
    });``
  }

  private throwError(error) {
    try {
      throw new Error(error);
    } catch (e) {
      alert(`${e.name}: ${e.message}`);
    }
  }

  addField(field: string) {
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

  deleteField(index) {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else if (!this.fields) {
      this.throwError('Invalid fields');
    } else {
      // TODO: Wrap Window with WindowWrapper
      if (window.confirm('Are you sure you wish to delete this field?')) {
        this.fields.splice(index, 1);
        this.fields_out.emit(this.fields);
      }
    }
  }

  ngOnInit() {
  }
}
