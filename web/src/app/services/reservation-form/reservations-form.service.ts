import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Reservation } from '../../models/reservation';

export type ReservationForm = FormGroup<{
  id: FormControl<number | null | undefined>
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  flightNumber: FormControl<string>;
  departureDate: FormControl<Date | null>;
  arrivalDate: FormControl<Date | null>;
  ticketClass: FormControl<number | null>;
}>;

@Injectable({
  providedIn: 'root'
})
export class ReservationFormService {
  buildForm(reservation: Reservation): ReservationForm {
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
        reservation.departureDate, {
          validators: [ Validators.required ],
          nonNullable: true
        }
      ),
      arrivalDate: new FormControl(
        reservation.arrivalDate, {
          validators: [ Validators.required ],
          nonNullable: true
        }
      ),
      ticketClass: new FormControl(
        reservation.ticketClass, {
          validators: [ Validators.required ],
          nonNullable: true
        }
      )
    });
  }

  getReservationFromForm(form: ReservationForm): Reservation {
    let reservation: Reservation = {
      id: form.controls['id'].value,
      firstName: form.controls['firstName'].value,
      lastName: form.controls['lastName'].value,
      flightNumber: form.controls['flightNumber'].value,
      departureDate: form.controls['departureDate'].value,
      arrivalDate: form.controls['arrivalDate'].value,
      ticketClass: form.controls['ticketClass'].value
    };
    return reservation;
  }
}
