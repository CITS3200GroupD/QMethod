import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule  } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { UserIndexComponent } from './user-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyService } from '../../survey.service';
import { MockSurveyService } from '../../testing/mocksurvey.service';
import { UserService } from '../../user.service';
import { MockUserService } from '../../testing/mockuser.service';
import { WindowWrap } from '../../window-wrapper';
import { MockWindowWrap } from '../../testing/Testing';

describe('UserIndexComponent', () => {
  let component: UserIndexComponent;
  let fixture: ComponentFixture<UserIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ UserIndexComponent,
        {provide: SurveyService, useClass: MockSurveyService},
        {provide: UserService, useClass: MockUserService},
        {provide: WindowWrap, useClass: MockWindowWrap}
      ],
      declarations: [ UserIndexComponent ],
      imports: [ NgbModule, RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check params', () => {
    expect(component.id).toBe(undefined);
    expect(component.valid).toBe(false);
  });
});
