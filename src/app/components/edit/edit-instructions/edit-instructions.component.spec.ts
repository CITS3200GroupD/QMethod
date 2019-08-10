import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstructionsComponent } from './edit-instructions.component';

describe('EditInstructionsComponent', () => {
  let component: EditInstructionsComponent;
  let fixture: ComponentFixture<EditInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
