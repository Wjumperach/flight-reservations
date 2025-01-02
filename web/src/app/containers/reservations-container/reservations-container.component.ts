import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { SearchComponent } from '../../components/search/search.component';
import { Reservation } from '../../models/reservation';
import { ReservationsListComponent } from '../../components/reservations-list/reservations-list.component';
import { ReservationsStateService } from '../../services/reservations-state/reservations-state.service';
import { Error } from '../../models/error';

@Component({
  selector: 'app-reservations-container',
  standalone: true,
  imports: [ CommonModule, MatProgressSpinnerModule, SearchComponent, ReservationsListComponent, AsyncPipe ],
  templateUrl: './reservations-container.component.html',
  styleUrl: './reservations-container.component.css'
})
export class ReservationsContainerComponent {
  private _reservationsStateService: ReservationsStateService = inject(ReservationsStateService);

  reservations: Observable<Reservation[]> = this._reservationsStateService.reservations;
  loading: Observable<boolean> = this._reservationsStateService.loading;
  searchedText: Observable<string | undefined | null> = this._reservationsStateService.searchedText;
  searchedReservations: Observable<Reservation[]> = this._reservationsStateService.searchedReservations

  openAddDialog(): void{
    this._reservationsStateService.openAddDialog();
  }

  openUpdateDialog(reservation: Reservation): void {
    this._reservationsStateService.openUpdateDialog(reservation);
  }

  openDeleteDialog(reservation: Reservation): void {    
    this._reservationsStateService.openDeleteDialog(reservation);
  }

  changeSearchedText(text: string | null | undefined): void {
    this._reservationsStateService.changeSearchedText(text ?? '');
  }

  ngOnInit(): void {
    this._reservationsStateService.getAll();
  }
}
