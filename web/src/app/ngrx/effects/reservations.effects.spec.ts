import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScannedActionsSubject } from '@ngrx/store';

import { ReservationsEffects } from './reservations.effects';
import { initialState } from '../reducers/reservations.reducer';

describe('ReservationsEffect', () => {
  let effects: ReservationsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        ReservationsEffects,
        provideMockStore({ initialState }),
        ScannedActionsSubject
      ]
    });

    effects = TestBed.inject(ReservationsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
