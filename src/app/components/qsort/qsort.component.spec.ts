import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QsortComponent } from './qsort.component';
import { RouterTestingModule  } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('QsortComponent', () => {
  let component: QsortComponent;
  let fixture: ComponentFixture<QsortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule ],
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
