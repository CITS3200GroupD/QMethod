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

  it('table headers', () => {
    const html_element: HTMLElement = fixture.nativeElement;
    const rows = html_element.querySelectorAll('tr');
    const labels = rows[0].querySelectorAll('td');
    expect(labels.length).toBe(6);
    expect(labels[0].textContent).toContain('#');
    expect(labels[1].textContent).toContain('Survey');
    expect(labels[2].textContent).toContain('Statements');
    expect(labels[3].textContent).toContain('Responses');
    expect(labels[4].textContent).toContain('View');
    expect(labels[5].textContent).toContain('Actions');
  });

  it('table contents', () => {
    const html_element: HTMLElement = fixture.nativeElement;
    const rows = html_element.querySelectorAll('tr');
    const survey1 = rows[1].querySelectorAll('td');
    const survey2 = rows[2].querySelectorAll('td');
    expect(survey1.length).toBe(7);
    expect(survey1[0].textContent).toBe('1');
    expect(survey1[1].textContent).toBe(valid_survey_list[0].name);
    expect(survey1[2].textContent).toBe(valid_survey_list[0].statements.length.toString());
    // expect(survey1[3].textContent).toBe(valid_survey_list[0].users.length.toString());
    expect(survey1[4].textContent).toContain('Results');
    expect(survey1[5].textContent).toContain('View');
    expect(survey1[6].textContent).toBe('');
    expect(survey2.length).toBe(7);
    expect(survey2[0].textContent).toBe('2');
    expect(survey2[1].textContent).toBe(valid_survey_list[1].name);
    expect(survey2[2].textContent).toBe(valid_survey_list[1].statements.length.toString());
    // expect(survey2[3].textContent).toBe(valid_survey_list[1].users.length.toString());
    expect(survey2[4].textContent).toContain('Results');
    expect(survey2[5].textContent).toContain('Edit');
    expect(survey2[6].textContent).toBe('');
  });

  it('create survey button', () => {
    const html_element: HTMLElement = fixture.nativeElement;
    const btn = html_element.getElementsByClassName('btn btn-secondary btn-block');
    expect(btn[0].textContent).toContain('Create New Survey');
  });

  it('delete Survey', () => {
    expect(component.deleteSurvey(valid_survey_list[0]._id)).toBe(true);
  });

});
