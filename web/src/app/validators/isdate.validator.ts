import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const isValidDate = !isNaN(Date.parse(value));

    return isValidDate ? null : { invalidDate: { value } };
  };
}
