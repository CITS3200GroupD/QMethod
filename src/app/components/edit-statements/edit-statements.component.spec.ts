import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditStatementsComponent } from './edit-statements.component';
import { Ng2PaginationModule  } from 'ng2-pagination';

import { RouterTestingModule  } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WindowWrap } from '../../window-wrapper';
import { MockWindowWrap } from '../../testing/Testing';

describe('EditStatementsComponent', () => {
  let component: EditStatementsComponent;
  let fixture: ComponentFixture<EditStatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStatementsComponent ],
      imports: [ RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientModule, Ng2PaginationModule],
      providers: [ EditStatementsComponent,
        {provide: WindowWrap, useClass: MockWindowWrap}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check params', () => {
    expect(component.statements_page).toBe(undefined);
    expect(component.statements_length).toBe(0);
    expect(component.statements).toBe(undefined);
  });
});
