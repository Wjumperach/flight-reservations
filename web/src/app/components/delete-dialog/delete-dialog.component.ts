import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Reservation } from '../../models/reservation';
import { DialogTitles, ButtonNames } from '../../consts/consts';

@Component({
  selector: 'app-pet-confirmation-dialog',
  standalone: true,
  imports: [ MatDialogModule, MatDialogClose, MatButtonModule ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  private _dialogRef: MatDialogRef<DeleteDialogComponent, Reservation> = inject(MatDialogRef<DeleteDialogComponent>);
  private _reservation: Reservation = inject(MAT_DIALOG_DATA).reservation;

  readonly DialogTitles = DialogTitles;
  readonly ButtonNames = ButtonNames;

  message: string = '';

  closeDialog(): void {
    this._dialogRef.close(this._reservation);
  }
}
