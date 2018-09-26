import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { CookieService, CookieModule } from 'ngx-cookie';
import { MockCookieService } from './testing/Testing';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ CookieModule.forRoot() ],
      providers: [ AuthService,
        { provide: CookieService, useClass: MockCookieService}
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
