import { reservationsReducer, initialState } from './reservations.reducer';

import { provideMockStore } from '@ngrx/store/testing';

describe('Reservations Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reservationsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
