import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule  } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLinkComponent } from './admin-link.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AdminLinkComponent', () => {
  let component: AdminLinkComponent;
  let fixture: ComponentFixture<AdminLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLinkComponent ],
      imports: [ NgbModule, RouterTestingModule, FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('check params', () => {
    expect(component.survey).toBeTruthy();
    expect(typeof component.survey).toBe('object');
    expect(component.angForm).toBeTruthy();
    // TODO: Better checks
  });
});
