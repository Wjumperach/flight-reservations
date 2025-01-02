import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { Reservation } from '../../models/reservation';
import { Error } from '../../models/error';

export const ReservationsActions = createActionGroup({
  source: 'Reservations',
  events: {
    'Get all': emptyProps(),
    'Get all success': props<{ reservations: Reservation[] }>(),
    'Get all error': props<{ error: Error }>(),
    'Get by id': props<{ id: number }>(),
    'Get by id success': props<{ reservation: Reservation }>(),
    'Get by id error': props<{ error: Error }>(),
    'Add': props<{ reservation: Reservation }>(),
    'Add success': props<{ reservation: Reservation }>(),
    'Add error': props<{ error: Error }>(),
    'Update': props<{ reservation: Reservation }>(),
    'Update success': props<{ reservation: Reservation }>(),
    'Update error': props<{ error: Error }>(),
    'Delete': props<{ reservation: Reservation }>(),
    'Delete success': props<{ id: number }>(),
    'Delete error': props<{ error: Error }>(),
  }
});

export const OpenDialogActions = createActionGroup({
  source: 'Dialogs',
  events: {
    'Open add dialog': props<{ reservation: Reservation }>(),
    'Open update dialog': props<{ reservation: Reservation }>(),
    'Open delete dialog': props<{ reservation: Reservation }>(),
    'Open success dialog': props<{ message: string }>(),
    'Open error dialog': props<{ error: Error }>(),
    'Action canceled': emptyProps()
  }
});

export const SearchActions = createActionGroup({
  source: 'Search',
  events: {
    'Change text': props<{ searchedText: string }>()
  }
});
