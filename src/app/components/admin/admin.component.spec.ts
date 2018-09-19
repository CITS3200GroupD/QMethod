import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent, SurveyPipe } from './admin.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule  } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Ng2PaginationModule } from 'ng2-pagination';
import { Survey } from '../../models';
import { MockWindowWrap, ValidSurveyList } from '../../testing/Testing';
import { SurveyService } from '../../survey.service';
import { Observable, of } from 'rxjs';
import { WindowWrap } from '../../window-wrapper';
import * as Settings from '../../../../config/Settings';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  const valid_survey_list: Survey[] = ValidSurveyList;

  class MockSurveyService {

    deleteSurvey(id: string): Observable<Object> {
      const return_val = 'Successfully Removed';
      return of(return_val);
    }

    getSurveys(): Observable<Object> {
      return of(ValidSurveyList);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AdminComponent,
        {provide: SurveyService, useClass: MockSurveyService},
        {provide: WindowWrap, useClass: MockWindowWrap}
      ],
      declarations: [ AdminComponent, SurveyPipe ],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule,
        Ng2PaginationModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
    component = TestBed.get(AdminComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check params', () => {
    expect(component.page).toBe(undefined);
    expect(component.filter).toBe(undefined);
    expect(component.surveys).toBe(valid_survey_list);
    expect(component.PAGINATE_TABLES).toBe(Settings.PAGINATE_TABLES);
  });

  it('delete Survey', () => {
    expect(component.deleteSurvey(valid_survey_list[0]._id)).toBe(true);
  });

});
