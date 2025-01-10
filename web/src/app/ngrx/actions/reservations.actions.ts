import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { Reservation } from '../../models/reservation';
import { ProblemDetails } from '../../models/problemdetails';

export const ReservationsActions = createActionGroup({
  source: 'Reservations',
  events: {
    'Get all': emptyProps(),
    'Get all success': props<{ reservations: Reservation[] }>(),
    'Get all error': props<{ problemDetails: ProblemDetails }>(),
    'Get by id': props<{ id: number }>(),
    'Get by id success': props<{ reservation: Reservation }>(),
    'Get by id error': props<{ problemDetails: ProblemDetails }>(),
    'Add': props<{ reservation: Reservation }>(),
    'Add success': props<{ reservation: Reservation }>(),
    'Add error': props<{ problemDetails: ProblemDetails }>(),
    'Update': props<{ reservation: Reservation }>(),
    'Update success': props<{ reservation: Reservation }>(),
    'Update error': props<{ problemDetails: ProblemDetails }>(),
    'Delete': props<{ reservation: Reservation }>(),
    'Delete success': props<{ id: number }>(),
    'Delete error': props<{ problemDetails: ProblemDetails }>(),
    'Sort': props<{ sort: { active: string, direction: string }}>(),
    'Set page info': props<{ pageInfo: { pageIndex: number, pageSize: number }}>()
  }
});

export const OpenDialogActions = createActionGroup({
  source: 'Dialogs',
  events: {
    'Open add dialog': props<{ reservation: Reservation }>(),
    'Open update dialog': props<{ reservation: Reservation }>(),
    'Open delete dialog': props<{ reservation: Reservation }>(),
    'Open success dialog': props<{ message: string }>(),
    'Open error dialog': props<{ problemDetails: ProblemDetails }>(),
    'Action canceled': emptyProps()
  }
});

export const SearchActions = createActionGroup({
  source: 'Search',
  events: {
    'Set searched text': props<{ searchedText: string }>()
  }
});
