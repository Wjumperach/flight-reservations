import { TestBed } from '@angular/core/testing';

import { ReservationFormService } from './reservations-form.service';

describe('ReservationsFormService', () => {
  let service: ReservationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
