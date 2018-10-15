import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SubmissionComponent } from './submission.component';
import { WindowWrap } from 'src/app/window-wrapper';
import { MockWindowWrap } from 'src/app/testing/Testing';

describe('SubmissionComponent', () => {
  let component: SubmissionComponent;
  let fixture: ComponentFixture<SubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SubmissionComponent,
      {provide: WindowWrap, useClass: MockWindowWrap},
      ],
      imports: [ HttpClientModule, RouterTestingModule ],
      declarations: [ SubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
