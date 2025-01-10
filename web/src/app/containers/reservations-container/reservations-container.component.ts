import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SearchComponent } from '../../components/search/search.component';
import { Reservation } from '../../models/reservation';
import { ReservationsListComponent } from '../../components/reservations-list/reservations-list.component';
import { ReservationsStateService } from '../../services/reservations-state/reservations-state.service';

@Component({
    selector: 'app-reservations-container',
    imports: [CommonModule, MatProgressSpinnerModule, SearchComponent, ReservationsListComponent, AsyncPipe],
    templateUrl: './reservations-container.component.html',
    styleUrl: './reservations-container.component.css'
})
export class ReservationsContainerComponent {
  private _reservationsStateService: ReservationsStateService = inject(ReservationsStateService);

  reservations = this._reservationsStateService.reservations;
  loading = this._reservationsStateService.loading;
  sort = this._reservationsStateService.sort;
  pageInfo = this._reservationsStateService.pageInfo;
  searchedText = this._reservationsStateService.searchedText;
  searchedReservations = this._reservationsStateService.searchedReservations;

  ngOnInit(): void {
    this._reservationsStateService.getAll();
  }

  openAddDialog(): void{
    this._reservationsStateService.openAddDialog();
  }

  openUpdateDialog(reservation: Reservation): void {
    this._reservationsStateService.openUpdateDialog(reservation);
  }

  openDeleteDialog(reservation: Reservation): void {    
    this._reservationsStateService.openDeleteDialog(reservation);
  }

  setSort(sort: {active: string, direction: string}): void {
    this._reservationsStateService.setSort(sort);
  }

  setPageInfo(pageInfo: { pageIndex: number, pageSize: number }): void {
    this._reservationsStateService.setPageInfo(pageInfo);
  }

  setSearchedText(text: string | null | undefined): void {
    this._reservationsStateService.setSearchedText(text);
  }
}
