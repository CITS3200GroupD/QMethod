import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFormsComponent } from './edit-forms.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WindowWrap } from '../../window-wrapper';


describe('EditFormsComponent', () => {
  let component: EditFormsComponent;
  let fixture: ComponentFixture<EditFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormsComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [ WindowWrap ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
