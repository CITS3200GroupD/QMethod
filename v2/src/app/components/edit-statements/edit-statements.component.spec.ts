import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStatementsComponent } from './edit-statements.component';

describe('EditStatementsComponent', () => {
  let component: EditStatementsComponent;
  let fixture: ComponentFixture<EditStatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStatementsComponent ]
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
});
