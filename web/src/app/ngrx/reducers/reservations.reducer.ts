import { ActionReducer, createReducer, on } from '@ngrx/store';

import { Reservation } from '../../models/reservation';
import { ReservationsActions, SearchActions } from '../actions/reservations.actions';
import { ProblemDetails } from '../../models/problemdetails';
import { Sort } from '../../models/sort';

export interface ReservationsState {
  reservations: Reservation[];
  loading: boolean;
  problemDetails: ProblemDetails | null;
  sort: Sort;
  pageInfo: {
    pageIndex: number;
    pageSize: number;
  };
  searchedText: string;
}

export const initialState: ReservationsState = {
  reservations: [],
  loading: false,
  problemDetails: null,
  sort: {
    active: '',
    direction: ''
  },
  pageInfo: {
    pageIndex: 0,
    pageSize: 10,
  },
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

  on(ReservationsActions.getAllSuccess, (state: ReservationsState, { reservations }) => {
    return {
      ...state,
      reservations,
      loading: false,
      problemDetails: null
    }
  }),

  on(ReservationsActions.getAllError, (state: ReservationsState, { problemDetails }) => {
    return {
      ...state,
      reservations: [],
      loading: false,
      problemDetails
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
      problemDetails: null
    }
  }),

  on(ReservationsActions.getByIdError, (state: ReservationsState, { problemDetails }) => {
    return {
      ...state,
      loading: false,
      problemDetails
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
      problemDetails: null
    }
  }),

  on(ReservationsActions.addError, (state: ReservationsState, { problemDetails }) => {
    return {
      ...state,
      loading: false,
      problemDetails
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
      problemDetails: null
    }
  }),

  on(ReservationsActions.updateError, (state: ReservationsState, { problemDetails }) => {
    return {
      ...state,
      loading: false,
      problemDetails
    }
  }),

  on(ReservationsActions.delete, (state: ReservationsState) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(ReservationsActions.deleteSuccess, (state: ReservationsState, { id }) => {
    return {
      ...state,
      reservations: state.reservations.filter(r => r.id != id),
      loading: false,
      prbblemDetails: null
    }
  }),

  on(ReservationsActions.deleteError, (state: ReservationsState, { problemDetails }) => {
    return {
      ...state,
      loading: false,
      problemDetails
    }
  }),

  on(ReservationsActions.sort, (state: ReservationsState, { sort }) => {
    return {
      ...state,
      sort
    }
  }),

  on(ReservationsActions.setPageInfo, (state: ReservationsState, { pageInfo }) => {
    return {
      ...state,
      pageInfo
    }
  }),

  on(SearchActions.setSearchedText, (state: ReservationsState, { searchedText }) => {
    return {
      ...state,
      searchedText
    }
  })
);

