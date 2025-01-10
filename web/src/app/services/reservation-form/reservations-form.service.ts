import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Reservation } from '../../models/reservation';
import { greaterThanOrEqual } from '../../validators/greaterthanorequal.validator';
import { fromFuture } from '../../validators/fromfuture.validator';
import { isDate } from '../../validators/isdate.validator';

export type ReservationForm = FormGroup<{
  id: FormControl<number | null | undefined>
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  flightNumber: FormControl<string>;
  departureDate: FormControl<Date | null>;
  departureTime: FormControl<Date | null>;
  arrivalDate: FormControl<Date | null>;
  arrivalTime: FormControl<Date | null>;
  ticketClass: FormControl<number | null>;
}>;

@Injectable({
  providedIn: 'root'
})
export class ReservationFormService {
  buildForm(reservation: Reservation): ReservationForm {
    const initialDepartureDateTime = reservation.departureDateTime ? new Date(reservation.departureDateTime) : null;
    const initialArrivalDateTime = reservation.arrivalDateTime ? new Date(reservation.arrivalDateTime) : null;

    return new FormGroup({
      id: new FormControl(
        reservation.id
      ),
      firstName: new FormControl(
        reservation.firstName, {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern("^[a-zA-Z'-]+$")
          ],
          nonNullable: true
        }
      ),
      lastName: new FormControl(
        reservation.lastName, {
          validators: [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern("^[a-zA-Z'-]+$"),
          ],
          nonNullable: true
        }
      ),
      flightNumber: new FormControl(
        reservation.flightNumber, {
          validators: [
            Validators.required,

            Validators.minLength(2),
            Validators.maxLength(6),

            // Zamiast dwóch powyższych walidatorów można użyć walidatora wykorzystującego wyrażenia regex,
            // ale nie znam zasad tworzenia numerów lotu.
            // Validators.pattern(regexExpression)
          ],
          nonNullable: true
        }
      ),
      departureDate: new FormControl(
        initialDepartureDateTime, {
          validators: [ Validators.required, isDate(), fromFuture() ],
          nonNullable: true
        }
      ),
      departureTime: new FormControl(
        initialDepartureDateTime, {
          validators: [ Validators.required, isDate() ],
          nonNullable: true
        }
      ),
      arrivalDate: new FormControl(
        initialArrivalDateTime, {
          validators: [ Validators.required, isDate(), fromFuture() ],
          nonNullable: true
        }
      ),
      arrivalTime: new FormControl(
        initialArrivalDateTime, {
          validators: [ Validators.required, isDate() ],
          nonNullable: true
        }
      ),
      ticketClass: new FormControl(
        reservation.ticketClass, {
          validators: [ Validators.required ],
          nonNullable: true
        }
      )
    }, {
      validators: greaterThanOrEqual("departure", "arrival")
    });
  }

  getReservationFromForm(form: ReservationForm): Reservation {
    const reservation: Reservation = {
      id: form.controls.id?.value,
      firstName: form.controls.firstName.value,
      lastName: form.controls.lastName.value,
      flightNumber: form.controls.flightNumber.value,
      departureDateTime: this.getStringFromDate(form.controls.departureDate.value!, form.controls.departureTime.value!),
      arrivalDateTime: this.getStringFromDate(form.controls.arrivalDate.value!, form.controls.arrivalTime.value!),
      ticketClass: form.controls.ticketClass.value
    };
    return reservation;
  }

  private getStringFromDate(date: Date, time: Date): string{
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    if (!(time instanceof Date)) {
      time = new Date(time);
    }

    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    ).toJSON();
  }
}
