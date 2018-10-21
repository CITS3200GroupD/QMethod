import { TestBed, async, inject } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { AuthService } from '../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MockAuthService } from '../testing/Testing';

describe('AdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [AdminGuard,
        {provide: AuthService, useClass: MockAuthService},
      ]
    });
  });

  it('should init', inject([AdminGuard], (guard: AdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
