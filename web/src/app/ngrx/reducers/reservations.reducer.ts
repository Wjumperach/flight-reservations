import { ActionReducer, createReducer, on } from '@ngrx/store';

import { Reservation } from '../../models/reservation';
import { ReservationsActions, SearchActions } from '../actions/reservations.actions';
import { Error } from '../../models/error';

export interface ReservationsState {
  reservations: Reservation[];
  loading: boolean;
  error: Error | null;
  searchedText: string;
}

export const initialState: ReservationsState = {
  reservations: [],
  loading: false,
  error: null,
  searchedText: '',
};

export const reservationsReducer: ActionReducer<ReservationsState> = createReducer(
  initialState,

  on(ReservationsActions.getAll, (state: ReservationsState) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(ReservationsActions.getAllSuccess, (state: ReservationsState, action) => {
    return {
      ...state,
      reservations: action.reservations,
      loading: false,
      error: null
    }
  }),

  on(ReservationsActions.getAllError, (state: ReservationsState, action) => {
    return {
      ...state,
      reservations: [],
      loading: false,
      error: action.error
    }
  }),

  on(ReservationsActions.getById, (state: ReservationsState) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(ReservationsActions.getByIdSuccess, (state: ReservationsState) => {
    return {
      ...state,
      loading: false,
      error: null
    }
  }),

  on(ReservationsActions.getByIdError, (state: ReservationsState, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

  on(ReservationsActions.add, (state: ReservationsState) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(ReservationsActions.addSuccess, (state: ReservationsState, { reservation }) => {
    return {
      ...state,
      reservations: [
        ...state.reservations, {
          ...reservation
        }
      ],
      loading: false,
      error: null
    }
  }),

  on(ReservationsActions.addError, (state: ReservationsState, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

  on(ReservationsActions.update, (state: ReservationsState) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(ReservationsActions.updateSuccess, (state: ReservationsState, { reservation }) => {
    return {
      ...state,
      reservations: state.reservations.map(r => (r.id === reservation.id ? reservation : r)),
      loading: false,
      error: null
    }
  }),

  on(ReservationsActions.updateError, (state: ReservationsState, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

  on(ReservationsActions.delete, (state: ReservationsState) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(ReservationsActions.deleteSuccess, (state: ReservationsState, action) => {
    return {
      ...state,
      reservations: state.reservations.filter(r => r.id != action.id),
      loading: false,
      error: null
    }
  }),

  on(ReservationsActions.deleteError, (state: ReservationsState, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

  on(SearchActions.changeText, (state: ReservationsState, { searchedText }) => {
    return {
      ...state,
      searchedText: searchedText,
    }
  })
);

