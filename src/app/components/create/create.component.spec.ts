import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateComponent } from './create.component';

import { RouterTestingModule  } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WindowWrap } from '../../window-wrapper';
import { GridTemplates } from '../../models';
import * as Settings from '../../../../config/Settings';
import { MockWindowWrap, BlankComponent } from '../../testing/Testing';
import { SurveyService } from '../../survey.service';
import { MockSurveyService } from '../../testing/mocksurvey.service';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateComponent,
        {provide: WindowWrap, useClass: MockWindowWrap},
        {provide: SurveyService, useClass: MockSurveyService}
      ],
      declarations: [ CreateComponent ],
      imports: [ FormsModule, ReactiveFormsModule, HttpClientModule,
        RouterTestingModule.withRoutes([
          {path: 'admin', component: BlankComponent }
        ])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check params', () => {
    expect(component.cols_templates).toBeTruthy();
    expect(component['statements']).toBe(undefined);
    expect(component.angForm).toBeTruthy();
  });

  it('add survey', () => {
    expect(component.addSurvey('Test Survey', Settings.DEFAULT_RANGE)).toBe(true);
  });

  it('html labels', () => {
    const html_element: HTMLElement = fixture.nativeElement;
    const labels = html_element.querySelectorAll('label');
    expect(labels[0].textContent).toContain('Survey Name');
    expect(labels[1].textContent).toContain('Range');
    expect(labels[2].textContent).toContain('Statements');
  });

  it('html select', () => {
    const html_element: HTMLElement = fixture.nativeElement;
    const options = html_element.querySelectorAll('option');
    expect(options.length).toEqual(GridTemplates.length);
    if (options.length == GridTemplates.length) {
      for (let index = 0; index < GridTemplates.length; index++) {
        expect(options[index].textContent).toContain(GridTemplates[index].label);
      }
    }
  });

  it('create button', () => {
    const html_element: HTMLElement = fixture.nativeElement;
    const button = html_element.querySelector('button');
    expect(button.attributes["disabled"]).toBeTruthy();
    component.angForm.get('survey_name').markAsDirty();
    component.angForm.get('survey_name').markAsTouched();
    component.angForm.get('survey_name').setValue('New Survey');
    fixture.detectChanges();
    expect(button.attributes["disabled"]).toBeFalsy();
  });

  it('html error messages', () => {
    const html_element: HTMLElement = fixture.nativeElement;
    component.angForm.get('survey_name').markAsDirty();
    component.angForm.get('survey_name').markAsTouched();
    component.angForm.get('survey_range').setValue('');
    component.angForm.get('survey_range').markAsDirty();
    component.angForm.get('survey_range').markAsTouched();
    fixture.detectChanges();
    const alerts = html_element.getElementsByClassName('alert');
    expect(alerts[0].textContent).toContain('Survey Name is required.');
    expect(alerts[1].textContent).toContain('Range is required.');
    const button = html_element.querySelector('button');
    expect(button.attributes["disabled"]).toBeTruthy();
  })
});
