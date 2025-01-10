import { Pipe, PipeTransform } from '@angular/core';

import { ProblemDetails } from '../models/problemdetails';

@Pipe({
    name: 'toErrorList',
    standalone: true,
})
export class ToErrorListPipe implements PipeTransform {
    transform(problemDetails: ProblemDetails | null): { field: string; message: string }[] {
        if (!problemDetails){
            return [];
        }

        if (!problemDetails.errors){
            return [];
        }

        const errors = Object.entries(problemDetails.errors).reduce(
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