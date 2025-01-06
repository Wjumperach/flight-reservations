import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { DatePipe } from '@angular/common';

import { FEATURE_KEY, DATE_FORMAT } from '../../reservation.configuration';
import { ReservationsState } from '../reducers/reservations.reducer';
import { Reservation } from '../../models/reservation';
import { TicketClasses } from '../../models/ticketclass';
import { Error } from '../../models/error';

export const getReservationsStore: MemoizedSelector<ReservationsState, any> = createFeatureSelector<ReservationsState>(FEATURE_KEY);

export const selectReservations: MemoizedSelector<ReservationsState, Reservation[]> = createSelector(getReservationsStore, (state: ReservationsState) => state.reservations);
export const selectLoading: MemoizedSelector<ReservationsState, boolean> = createSelector(getReservationsStore, (state: ReservationsState) => state.loading);
export const selectError: MemoizedSelector<ReservationsState, Error | null> = createSelector(getReservationsStore, (state: ReservationsState) => state.error);
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
                datePipe.transform(reservation.departureDate, DATE_FORMAT)!.indexOf(searchedText!) > -1 ||
                datePipe.transform(reservation.arrivalDate, DATE_FORMAT)!.indexOf(searchedText!) > -1 ||
                TicketClasses.find((t) => reservation.ticketClass === t.id)!.name.toLowerCase().indexOf(searchedText!) > -1
            );
    }
  );
