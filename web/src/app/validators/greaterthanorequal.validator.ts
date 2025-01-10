import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function greaterThanOrEqual(startDateName: string, endDateName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const startDateDateControl = group.get(startDateName + 'Date');
        if (!startDateDateControl) {
            return null;
        }

        const startDateTimeControl = group.get(startDateName + 'Time');
        if (!startDateTimeControl) {
            return null;
        }
      
        const endDateDateControl = group.get(endDateName + 'Date');
        if (!endDateDateControl) {
            return null;
        }

        const endDateTimeControl = group.get(endDateName + 'Time');
        if (!endDateTimeControl) {
            return null;
        }

        if (!startDateDateControl.value){
            return null;
        }

        if (!startDateTimeControl.value){
            return null;
        }

        if (!endDateDateControl.value){
            return null;
        }

        if (!endDateTimeControl.value){
            return null;
        }

        const startDateTime = new Date(startDateDateControl.value);
        const startTime = new Date(startDateTimeControl.value);
        startDateTime.setHours(startTime.getHours());
        startDateTime.setMinutes(startTime.getMinutes());

        const endDateTime = new Date(endDateDateControl.value);
        const endTime = new Date(endDateTimeControl.value);
        endDateTime.setHours(endTime.getHours());
        endDateTime.setMinutes(endTime.getMinutes());
  
        if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
            return null;
        }
    
        return endDateTime >= startDateTime ? null : { invalidDateRange: true };
    };
}