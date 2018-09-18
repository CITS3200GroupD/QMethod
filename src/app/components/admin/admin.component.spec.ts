import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent, SurveyPipe } from './admin.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule  } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Ng2PaginationModule } from 'ng2-pagination';
import { Survey } from '../../Survey';
import { ValidSurveyList } from '../../Testing';
import { SurveyService } from '../../survey.service';
import { Observable, of } from 'rxjs';
import { WindowWrap } from '../../window-wrapper';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  const valid_survey_list: Survey[] = ValidSurveyList;

  class MockSurveyService {
    private uri: string = 'http://localhost:8080/api';

    deleteSurvey(id: string): Observable<Object> {
      const return_val = 'Successfully Removed';
      return of(return_val);
    }

    getSurveys(): Observable<Object> {
      return of(ValidSurveyList);
    }
  };

  class MockWindowWrap {
    get nativeWindow(): MockWindowWrapInner {
      let inner = new MockWindowWrapInner
      return inner;
    }
  }

  class MockWindowWrapInner {
    confirm(): boolean {
      return true;
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
  });

  it('delete Survey', () => {
    setTimeout(() => {
      component.deleteSurvey(valid_survey_list[0]._id);
    },
    500);
  })
});
