import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InitialSortComponent } from './initial-sort.component';

import { RouterTestingModule  } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NgDragDropModule } from 'ng-drag-drop';

describe('InitialSortComponent', () => {
  let component: InitialSortComponent;
  let fixture: ComponentFixture<InitialSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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

  it('check params', () => {
    expect(component.id).toBe(undefined);
    expect(component.survey).toBe(undefined);
    expect(component.disagree_update).toBe(undefined);
    expect(component.neutral_update).toBe(undefined);
    expect(component.agree_update).toBe(undefined);
    expect(component.current_index).toBe(0);
    expect(component.statementObjs).toBeTruthy();
  });
});
