import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogModule, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Reservation } from '../../models/reservation';
import { ReservationForm, ReservationFormService } from '../../services/reservation-form/reservations-form.service';
import { DialogTitles, ButtonNames } from '../../consts/consts';
import { ReservationsListItemComponent } from '../reservations-list-item/reservations-list-item.component';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [ MatDialogModule, MatDialogClose, MatButtonModule, ReservationsListItemComponent ],
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDialogComponent {
  private _dialogRef: MatDialogRef<EditDialogComponent, Reservation> = inject(MatDialogRef<EditDialogComponent>);
  private _reservationFormService: ReservationFormService = inject(ReservationFormService);
  private _reservation: Reservation = inject(MAT_DIALOG_DATA).reservation;

  readonly DialogTitles = DialogTitles;
  readonly ButtonNames = ButtonNames;

  reservationForm: ReservationForm = this._reservationFormService.buildForm(this._reservation);

  closeDialog(): void {
    if (this.reservationForm.invalid) {
      this.reservationForm.markAllAsTouched();
      this.reservationForm.updateValueAndValidity();
      return;
    }

    const reservation: Reservation = this._reservationFormService.getReservationFromForm(this.reservationForm);
    this._dialogRef.close(reservation);
  }
}
