import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QsortComponent } from './qsort.component';
import { RouterTestingModule  } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WindowWrap } from '../../window-wrapper';
import { MockWindowWrap, ValidSurveyList, ValidUserList } from '../../testing/Testing';
import { SurveyService } from 'src/app/survey.service';
import { MockSurveyService } from 'src/app/testing/mocksurvey.service';
import { MockUserService } from 'src/app/testing/mockuser.service';
import { UserService } from 'src/app/user.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('QsortComponent', () => {
  let component: QsortComponent;
  let fixture: ComponentFixture<QsortComponent>;
  const valid_survey_list = ValidSurveyList;
  const valid_user_list = ValidUserList;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ QsortComponent,
        {provide: WindowWrap, useClass: MockWindowWrap},
        { provide: SurveyService, useClass: MockSurveyService },
        { provide: UserService, useClass: MockUserService },
        { provide: ActivatedRoute, useValue:
          {
            params: of({id: valid_survey_list[0]._id}),
            queryParams: of({user_id: valid_user_list[11]._id})
          }
        }
      ],
      imports: [ HttpClientModule, RouterTestingModule, NgDragDropModule.forRoot()],
      declarations: [ QsortComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QsortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check params', () => {
    expect(component.id).toBe(valid_survey_list[0]._id);
    expect(component.user_id).toBe(valid_user_list[11]._id);
    expect(component.progress).toBe(2);
    expect(component.disagree).toEqual(valid_user_list[11].sort_disagree);
    expect(component.neutral).toEqual(valid_user_list[11].sort_neutral);
    expect(component.agree).toEqual(valid_user_list[11].sort_agree);
  });

  it('check grid - static', () => {
    component.drop_click(1, 1);
    component.drop_click(1, 2);
    component.drop_click(1, 0);
    component.drop_click(0, 1);
    component.drop_click(0, 0);
    component.drop_click(4, 3);
    component.drop_click(4, 1);

    expect(component.matrix).toEqual(
      [
        [9, 22],
        [21, 19, 20],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, 11, -1, 10],
        [-1, -1, -1],
        [-1, -1]
      ]
    );

    component.drop_click(2, 0);
    component.drop_click(2, 1);
    component.drop_click(2, 2);
    component.drop_click(2, 3);
    component.drop_click(3, 0);
    component.drop_click(3, 1);
    component.drop_click(3, 2);
    component.drop_click(3, 3);
    component.drop_click(3, 4);
    component.drop_click(4, 0);
    component.drop_click(4, 2);
    component.drop_click(5, 0);
    component.drop_click(5, 1);
    component.drop_click(5, 2);
    component.drop_click(6, 0);
    component.drop_click(6, 1);

    expect(component.matrix).toEqual(
      [
        [9, 22],
        [21, 19, 20],
        [12, 13, 14, 15],
        [16, 17, 18, 0, 1],
        [2, 11, 3, 10],
        [4, 5, 6],
        [7, 8]
      ]
    );
    expect(component.disagree_index).toEqual(component.disagree.length);
    expect(component.neutral_index).toEqual(component.neutral.length);
    expect(component.agree_index).toEqual(component.agree.length);
  });

  it('check grid - dynamic', () => {
    for (let i = 0; i < component.matrix.length; i++) {
      for (let j = 0; j < component.matrix[i].length; j++) {
        component.drop_click(i, j);
      }
    }
    expect(component.disagree_index).toEqual(component.disagree.length);
    expect(component.neutral_index).toEqual(component.neutral.length);
    expect(component.agree_index).toEqual(component.agree.length);
  });


});
