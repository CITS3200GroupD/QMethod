import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComponent } from './edit.component';

import { RouterTestingModule  } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WindowWrap } from '../../window-wrapper';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [ RouterTestingModule,
                FormsModule,
                NgbModule,
                ReactiveFormsModule,
                HttpClientModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ WindowWrap ]
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

});
