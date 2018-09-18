import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-statements',
  templateUrl: './edit-statements.component.html',
  styleUrls: ['./edit-statements.component.css']
})

export class EditStatementsComponent implements OnInit {

  statements_page: number;
  statements_length = 0;

  CHAR_LIMIT = 350;
  STATE_LIMIT = 80;
  statements: string[];

  @Input() set statements_in(statements_in: string[]) {
    // Fix for calling of input with undefined value
    if (statements_in) {
      this.statements = statements_in;
      this.statements_length = this.statements.length;
    }
  }
  @Input() disabled: boolean;
  @Output() statements_out = new EventEmitter<string[]>();

  angForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {
      this.createForm();
    }

  private createForm() {
    this.angForm = this.fb.group({
      statement: ['', Validators.required ]
    });
  }

  private throwError(error) {
    try {
      throw new Error(error);
    } catch (e) {
      alert(`${e.name}: ${e.message}`);
    }
  }

  addStatement(statement: string) {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      this.route.params.subscribe(params => {
        this.statements.push(statement);
        this.statements_out.emit(this.statements);
        this.statements_length = this.statements.length;
      });
    }
  }

  deleteStatement(statement_index) {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      this.route.params.subscribe(params => {
        if (window.confirm('Are you sure you wish to delete this statement?')) {
          this.statements.splice(statement_index, 1);
          this.statements_out.emit(this.statements);
          this.statements_length = this.statements.length;
        }
      });
    }
  }

  ngOnInit() {
  }
}
