import { Pipe, PipeTransform } from '@angular/core';

import { Error } from '../models/error';

@Pipe({
    name: 'toErrorList',
    standalone: true,
})
export class ToErrorListPipe implements PipeTransform {
    transform(error: Error | null): { field: string; message: string }[] {
        if (!error){
            return [];
        }

        if (!error.errors){
            return [];
        }

        const errors = Object.entries(error.errors).reduce(
            (acc, cur: [string, string[]]) => {
                for (let err of cur[1]) {
                    acc.push({
                        field: cur[0],
                        message: err,
                    });
                }

                return acc;
            },
            [] as { field: string; message: string }[]
        );
        return errors;
    }
  }