import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';

import { RouterTestingModule  } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WindowWrap } from '../../window-wrapper';
import { SurveyService } from '../../survey.service';
import { MockSurveyService } from '../../testing/mocksurvey.service';
import { MockWindowWrap } from '../../testing/Testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of} from 'rxjs';
import { ValidSurveyList } from '../../testing/Testing';
import * as Settings from '../../../../config/Settings';
import { GridTemplates } from '../../models';


describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let valid_survey_list = ValidSurveyList;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [ RouterTestingModule,
                FormsModule,
                NgbModule,
                ReactiveFormsModule,
                HttpClientModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ EditComponent,
        {provide: WindowWrap, useClass: MockWindowWrap},
        {provide: SurveyService, useClass: MockSurveyService},
        {provide: ActivatedRoute, useValue: { params: of({id: valid_survey_list[0]._id})}}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check params', () => {
    expect(component.statements_page).toBe(undefined);
    expect(component.valid_grid).toBe(undefined);
    expect(component.range).toBe(undefined);
    expect(component.survey).toBe(valid_survey_list[0]);
    expect(component.NAME_LIMIT).toBe(Settings.NAME_LIMIT);
    expect(component.FIELDS_LIMIT).toBe(Settings.FIELDS_LIMIT);
    expect(component.STATE_LIMIT).toBe(Settings.STATE_LIMIT);
    expect(component.cols_templates).toBe(GridTemplates);
    expect(component.angForm).toBeTruthy();
    expect(component.lengths.questionnaire).toBe(valid_survey_list[0].questionnaire.length);
    expect(component.lengths.statements).toBe(valid_survey_list[0].statements.length);
    expect(component.lengths.register).toBe(valid_survey_list[0].register.length);
  });
});
