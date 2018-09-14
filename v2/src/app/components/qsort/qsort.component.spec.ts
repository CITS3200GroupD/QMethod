import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QsortComponent } from './qsort.component';

describe('QsortComponent', () => {
  let component: QsortComponent;
  let fixture: ComponentFixture<QsortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QsortComponent ]
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
