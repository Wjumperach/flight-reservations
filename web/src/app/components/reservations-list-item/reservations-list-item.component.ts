import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { ReservationForm } from '../../services/reservation-form/reservations-form.service';
import { TicketClasses } from '../../models/ticketclass';
import { ReservationFormFields, ReservationTableHeaders, ErrorMessages } from '../../consts/consts';
import { DATE_FORMATS } from '../../reservation.configuration';

@Component({
    selector: 'app-reservations-list-item',
    imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatTimepickerModule,
        //MatNativeDateModule,
        MatFormFieldModule,
        MatIconModule,
    ],
    providers: [
        MatDatepickerModule
    ],
    templateUrl: './reservations-list-item.component.html',
    styleUrl: './reservations-list-item.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationsListItemComponent {
  readonly ReservationFormFields = ReservationFormFields;
  readonly ReservationTableHeaders = ReservationTableHeaders;
  readonly TicketClasses = TicketClasses;
  readonly ErrorMessages = ErrorMessages;
  readonly DATE_FORMATS = DATE_FORMATS;

  @Input()
  formGroup!: ReservationForm;

  today = new Date();
}
