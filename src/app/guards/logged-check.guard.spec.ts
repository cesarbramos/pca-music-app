import { TestBed } from '@angular/core/testing';

import { LoggedCheckGuard } from './logged-check.guard';

describe('LoggedCheckGuard', () => {
  let guard: LoggedCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
