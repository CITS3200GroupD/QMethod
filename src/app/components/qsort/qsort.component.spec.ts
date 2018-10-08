import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QsortComponent } from './qsort.component';
import { RouterTestingModule  } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WindowWrap } from '../../window-wrapper';
import { MockWindowWrap } from '../../testing/Testing';

describe('QsortComponent', () => {
  let component: QsortComponent;
  let fixture: ComponentFixture<QsortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ QsortComponent,
        {provide: WindowWrap, useClass: MockWindowWrap}
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
});
