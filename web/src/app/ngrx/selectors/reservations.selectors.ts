import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { DatePipe } from '@angular/common';

import { FEATURE_KEY, DATE_FORMAT } from '../../reservation.configuration';
import { ReservationsState } from '../reducers/reservations.reducer';
import { Reservation } from '../../models/reservation';
import { TicketClasses } from '../../models/ticketclass';
import { ProblemDetails } from '../../models/problemdetails';
import { Sort } from '../../models/sort';

export const getReservationsStore: MemoizedSelector<ReservationsState, any> = createFeatureSelector<ReservationsState>(FEATURE_KEY);

export const selectReservations: MemoizedSelector<ReservationsState, Reservation[]> = createSelector(getReservationsStore, (state: ReservationsState) => state.reservations);
export const selectLoading: MemoizedSelector<ReservationsState, boolean> = createSelector(getReservationsStore, (state: ReservationsState) => state.loading);
export const selectProblemDetails: MemoizedSelector<ReservationsState, ProblemDetails | null> = createSelector(getReservationsStore, (state: ReservationsState) => state.problemDetails);
export const selectSort: MemoizedSelector<ReservationsState, Sort> = createSelector(getReservationsStore, (state: ReservationsState) => state.sort);
export const selectPageInfo: MemoizedSelector<ReservationsState, { pageIndex: number, pageSize: number }> = createSelector(getReservationsStore, (state: ReservationsState) => state.pageInfo);
export const selectSearchedText: MemoizedSelector<ReservationsState, string> = createSelector(getReservationsStore, (state: ReservationsState) => state.searchedText);

const datePipe = new DatePipe('en-US');

export const selectSearchedReservations: MemoizedSelector<ReservationsState, Reservation[]> = createSelector(
    selectReservations,
    selectSearchedText,
    (reservations: Reservation[], searchedText: string | null | undefined) => {
        searchedText = searchedText?.toLowerCase() ?? '';
        return searchedText === '' ?
            reservations :
            reservations.filter((reservation: Reservation) => 
                reservation.firstName.toLowerCase().indexOf(searchedText!) > -1 ||
                reservation.lastName.toLowerCase().indexOf(searchedText!) > -1 ||
                reservation.flightNumber.toLowerCase().indexOf(searchedText!) > -1 ||
                datePipe.transform(reservation.departureDateTime, DATE_FORMAT)!.indexOf(searchedText!) > -1 ||
                datePipe.transform(reservation.arrivalDateTime, DATE_FORMAT)!.indexOf(searchedText!) > -1 ||
                TicketClasses.find((t) => reservation.ticketClass === t.id)!.name.toLowerCase().indexOf(searchedText!) > -1
            );
    }
  );
