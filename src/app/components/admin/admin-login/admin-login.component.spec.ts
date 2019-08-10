import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginComponent } from './admin-login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { MockAuthService, MockWindowWrap } from 'src/app/testing/Testing';
import { WindowWrap } from 'src/app/window-wrapper';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ AdminLoginComponent,
        { provide: AuthService, useClass: MockAuthService },
        { provide: WindowWrap, useClass: MockWindowWrap }
      ],
      imports: [ FormsModule, ReactiveFormsModule, RouterTestingModule ],
      declarations: [ AdminLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
