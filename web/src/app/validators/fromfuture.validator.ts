import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fromFuture(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    return value >= today ? null : { notFromFuture: true };
  };
}
