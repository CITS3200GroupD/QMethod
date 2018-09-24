import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InitialSortComponent } from './initial-sort.component';

import { RouterTestingModule  } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';
import { MockWindowWrap } from '../../testing/Testing';
import { WindowWrap } from '../../window-wrapper';

describe('InitialSortComponent', () => {
  let component: InitialSortComponent;
  let fixture: ComponentFixture<InitialSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ InitialSortComponent,
        {provide: WindowWrap, useClass: MockWindowWrap}
      ],
      declarations: [ InitialSortComponent ],
      imports: [ RouterTestingModule, HttpClientModule, NgDragDropModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
