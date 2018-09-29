import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginComponent } from './admin-login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../auth.service';
import { MockAuthService } from '../../testing/Testing';

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ AdminLoginComponent,
        { provide: AuthService, useClass: MockAuthService }
      ],
      imports: [ RouterTestingModule],
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