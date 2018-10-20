import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InitialSortComponent } from './initial-sort.component';
import { RouterTestingModule  } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';
import { MockWindowWrap } from '../../testing/Testing';
import { WindowWrap } from '../../window-wrapper';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SurveyService } from 'src/app/survey.service';
import { MockSurveyService } from 'src/app/testing/mocksurvey.service';
import { MockUserService } from 'src/app/testing/mockuser.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ValidSurveyList, ValidUserList } from '../../testing/Testing';
import { UserService } from 'src/app/user.service';

describe('InitialSortComponent', () => {
  let component: InitialSortComponent;
  let fixture: ComponentFixture<InitialSortComponent>;
  const valid_survey_list = ValidSurveyList;
  const valid_user_list = ValidUserList;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ InitialSortComponent,
        { provide: WindowWrap, useClass: MockWindowWrap },
        { provide: SurveyService, useClass: MockSurveyService },
        { provide: UserService, useClass: MockUserService },
        { provide: ActivatedRoute, useValue:
          {
            params: of({id: valid_survey_list[0]._id}),
            queryParams: of({user_id: valid_user_list[10]._id})
          }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ InitialSortComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        NgDragDropModule.forRoot()
      ]
    })
    .compileComponents();
    spyOn(console, 'error');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check params', () => {
    expect(component.survey).toBe(valid_survey_list[0]);
    expect(component.id).toBe(valid_survey_list[0]._id);
    expect(component.user_id).toBe(valid_user_list[10]._id);
    expect(component.statements).toBe(valid_survey_list[0].statements);
    expect(component.current_index).toBe(0);
    expect(component.disagree).toEqual([]);
    expect(component.neutral).toEqual([]);
    expect(component.agree).toEqual([]);
  });

  it('adding items to disagree', () => {
    component.onDisagreeClick();
    component.onDisagreeClick();
    component.onDisagreeClick();
    component.onDisagreeClick();
    expect(component.current_index).toBe(0);
    expect(component.disagree).toEqual([0, 1, 2, 3]);
    expect(component.neutral).toEqual([]);
    expect(component.agree).toEqual([]);
  });

  it('adding items to neutral', () => {
    component.onNeutralClick();
    component.onNeutralClick();
    component.onNeutralClick();
    component.onNeutralClick();
    expect(component.current_index).toBe(0);
    expect(component.disagree).toEqual([]);
    expect(component.neutral).toEqual([0, 1, 2, 3]);
    expect(component.agree).toEqual([]);
  });

  it('adding items to agree', () => {
    component.onAgreeClick();
    component.onAgreeClick();
    component.onAgreeClick();
    component.onAgreeClick();
    expect(component.current_index).toBe(0);
    expect(component.disagree).toEqual([]);
    expect(component.neutral).toEqual([]);
    expect(component.agree).toEqual([0, 1, 2, 3]);
  });


  it('combined static test', () => {
    component.onAgreeClick();
    component.onDisagreeClick();
    component.onNeutralClick();
    component.onAgreeClick();
    component.onDisagreeClick();
    component.onNeutralClick();
    component.onAgreeClick();
    component.onAgreeClick();
    component.onNeutralClick();
    component.onNeutralClick();
    component.onDisagreeClick();
    component.onDisagreeClick();
    component.onAgreeClick();
    component.onAgreeClick();
    component.onAgreeClick();
    component.onAgreeClick();
    component.onAgreeClick();
    component.onDisagreeClick();
    component.onDisagreeClick();
    component.onNeutralClick();
    component.onNeutralClick();
    component.onAgreeClick();
    component.onNeutralClick();
    expect(component.current_index).toBe(-1);
    expect(component.disagree).toEqual([1, 4, 10, 11, 17, 18]);
    expect(component.neutral).toEqual([2, 5, 8, 9, 19, 20, 22]);
    expect(component.agree).toEqual([0, 3, 6, 7, 12, 13, 14, 15, 16, 21]);
  });

  it('combined dynamic test', () => {
    const check_agree = [];
    const check_neutral = [];
    const check_disagree = [];
    for (let i = 0; i < component.statements.length; i++) {
      const random = Math.random();
      if (random >= 0.66 ) {
        component.onAgreeClick();
        check_agree.push(i);
      } else if (random >= 0.33 ) {
        component.onNeutralClick();
        check_neutral.push(i);
      } else {
        component.onDisagreeClick();
        check_disagree.push(i);
      }
    }
    expect(component.current_index).toBe(-1);
    expect(component.disagree).toEqual(check_disagree);
    expect(component.neutral).toEqual(check_neutral);
    expect(component.agree).toEqual(check_agree);
  });

});
