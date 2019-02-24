import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';

import { RouterTestingModule  } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WindowWrap } from 'src/app/window-wrapper';
import { SurveyService } from 'src/app/survey.service';
import { MockSurveyService } from 'src/app/testing/mocksurvey.service';
import { MockWindowWrap } from 'src/app/testing/Testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of} from 'rxjs';
import { ValidSurveyList } from 'src/app/testing/Testing';
import * as Settings from 'config/Settings';
import { GridTemplates } from 'src/app/models';


describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  const valid_survey_list = ValidSurveyList;

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
    spyOn(console, 'error');
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
    expect(component.range).toBe(Settings.DEFAULT_RANGE);
    expect(component.survey).toBe(valid_survey_list[0]);
    expect(component.NAME_LIMIT).toBe(Settings.NAME_LIMIT);
    expect(component.FIELDS_LIMIT).toBe(Settings.FIELDS_LIMIT);
    expect(component.STATE_LIMIT).toBe(Settings.STATE_LIMIT);
    expect(component.cols_templates).toBe(GridTemplates);
    expect(component.angForm).toBeTruthy();
  });

  it('update survey', () => {
    component.valid_grid = true;
    component.survey.publish = true;
    component.updateSurvey('New name', Settings.DEFAULT_RANGE);
    expect(console.error).toHaveBeenCalled();
    component.survey.publish = false;
    component.updateSurvey('New name', Settings.DEFAULT_RANGE);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('isInvalidGrid', () => {
    component.isInvalidGrid(false);
    expect(component.valid_grid).toBe(false);
    component.isInvalidGrid(true);
    expect(component.valid_grid).toBe(true);
  });

  it('update Statements', () => {
    component.survey.publish = false;
    const old_statements = valid_survey_list[0].statements.slice();
    const new_statements = ['test'];
    component.survey.statements = new_statements;
    expect(component.survey.statements).toBe(new_statements);
    component.updateStatements(old_statements);
    expect(component.survey.statements).toBe(old_statements);
    // Should not work when published
    component.survey.publish = true;
    component.updateStatements(new_statements);
    expect(component.survey.statements).toBe(old_statements);
    component.survey.publish = false;

  });

  it('update registration', () => {
    component.survey.publish = false;
    const old_fields = valid_survey_list[0].register.slice();
    const new_fields = [['test']];
    component.survey.register = new_fields;
    expect(component.survey.register).toBe(new_fields);
    component.updateFields('register', old_fields[0]);
    expect(component.survey.register).toBe(old_fields);
    // Should not work when published
    component.survey.publish = true;
    component.updateFields('register', new_fields[0]);
    expect(component.survey.register).toBe(old_fields);
    component.survey.publish = false;
  });

  it('update questionnaire', () => {
    component.survey.publish = false;
    const old_ques = valid_survey_list[0].questionnaire.slice();
    const new_ques = [['test']];
    component.survey.questionnaire = new_ques;
    expect(component.survey.questionnaire).toBe(new_ques);
    component.updateFields('questionnaire', old_ques[0]);
    expect(component.survey.questionnaire).toBe(old_ques);
    // Should not work when published
    component.survey.publish = true;
    component.updateFields('questionnaire', new_ques[0]);
    expect(component.survey.questionnaire).toBe(old_ques);
    component.survey.publish = false;
  });


});
