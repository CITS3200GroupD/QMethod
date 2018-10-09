// TODO: Reenable Unit Testing
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule  } from '@angular/router/testing';
import { RegistrationComponent } from './registration.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MockWindowWrap } from '../../testing/Testing';
import { WindowWrap } from '../../window-wrapper';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ RegistrationComponent,
        {provide: WindowWrap, useClass: MockWindowWrap}
      ],
      declarations: [ RegistrationComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
