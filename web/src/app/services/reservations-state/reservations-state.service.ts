import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Reservation } from '../../models/reservation';
import { ReservationsState } from '../../ngrx/reducers/reservations.reducer';
import {
  selectReservations,
  selectLoading,
  selectProblemDetails,
  selectSort,
  selectPageInfo,
  selectSearchedText,
  selectSearchedReservations
} from '../../ngrx/selectors/reservations.selectors';
import { ReservationsActions, OpenDialogActions, SearchActions } from '../../ngrx/actions/reservations.actions';
import { ProblemDetails } from '../../models/problemdetails';
import { Sort } from '../../models/sort';

@Injectable({
  providedIn: 'root'
})
export class ReservationsStateService {
  store: Store<ReservationsState> = inject(Store<ReservationsState>);

  reservations: Observable<Reservation[]> = this.store.select(selectReservations);
  loading: Observable<boolean> = this.store.select(selectLoading);
  problemDetails: Observable<ProblemDetails | null> = this.store.select(selectProblemDetails);
  sort: Observable<Sort> = this.store.select(selectSort);
  pageInfo: Observable<{ pageIndex: number, pageSize: number }> = this.store.select(selectPageInfo);
  searchedText: Observable<string | null | undefined> = this.store.select(selectSearchedText);
  searchedReservations: Observable<Reservation[]> = this.store.select(selectSearchedReservations);

  getAll(): void {
    this.store.dispatch(ReservationsActions.getAll());
  }

  getById(id: number): void {
    this.store.dispatch(ReservationsActions.getById({ id }));
  }

  openAddDialog(): void {
    const reservation: Reservation = this.createDefaultReservation();
    this.store.dispatch(OpenDialogActions.openAddDialog({ reservation }));
  }

  openUpdateDialog(reservation: Reservation): void {
    this.store.dispatch(OpenDialogActions.openUpdateDialog({ reservation }));
  }

  openDeleteDialog(reservation: Reservation): void {
    this.store.dispatch(OpenDialogActions.openDeleteDialog({ reservation }));
  }

  addReservation(reservation: Reservation): void {
    this.store.dispatch(ReservationsActions.add({ reservation }));
  }

  updateReservation(reservation: Reservation): void {
    this.store.dispatch(ReservationsActions.update({ reservation }));
  }

  deleteReservation(reservation: Reservation): void {
    this.store.dispatch(ReservationsActions.delete({ reservation }));
  }

  setSort(sort: { active: string, direction: string }): void {
    this.store.dispatch(ReservationsActions.sort({ sort })); 
  }

  setPageInfo(pageInfo: { pageIndex: number, pageSize: number }): void {
    this.store.dispatch(ReservationsActions.setPageInfo({ pageInfo }));
  }

  setSearchedText(searchedText: string | null | undefined): void {
    searchedText = searchedText ?? '';
    this.store.dispatch(SearchActions.setSearchedText({ searchedText }));
  }

  private createDefaultReservation(): Reservation {
    const reservation: Reservation = {
      firstName: '',
      lastName: '',
      flightNumber: '',
      departureDateTime: null,
      arrivalDateTime: null,
      ticketClass: null
    }
    return reservation;
  }
}
