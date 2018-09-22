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
});
