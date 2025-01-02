import { TestBed } from '@angular/core/testing';

import { ReservationsStateService } from './reservations-state.service';

describe('ReservationsStateService', () => {
  let service: ReservationsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
