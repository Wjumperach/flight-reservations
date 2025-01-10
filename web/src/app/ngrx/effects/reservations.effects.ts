import { Injectable, inject, OnDestroy } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Subject, of, takeUntil } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ReservationsService } from '../../services/reservations/reservations.service';
import { Reservation } from '../../models/reservation';
import { ReservationsActions, OpenDialogActions } from '../actions/reservations.actions';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
import { SuccessDialogComponent } from '../../components/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { Messages } from '../../consts/consts';

@Injectable()
export class ReservationsEffects implements OnDestroy {
  private _dialog: MatDialog = inject(MatDialog);
  private _reservationsService: ReservationsService = inject(ReservationsService);
  private _actions$: Actions = inject(Actions);
  private _destroy$: Subject<void> = new Subject<void>();

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  getAllReservations$ = createEffect(() => this._actions$.pipe(
    ofType(ReservationsActions.getAll),
    takeUntil(this._destroy$),
    exhaustMap(() => this._reservationsService.getAll()
      .pipe(
        map((reservations: Reservation[]) => ReservationsActions.getAllSuccess({ reservations })),
        catchError((error) => of(ReservationsActions.getAllError({ problemDetails: error.error})))
      )),
    )
  );

  getByIdReservations$ = createEffect(() => this._actions$.pipe(
    ofType(ReservationsActions.getById),
    takeUntil(this._destroy$),
    exhaustMap((action) => this._reservationsService.getById(action.id)
      .pipe(
        map((reservation: Reservation) => ReservationsActions.getByIdSuccess({ reservation })),
        catchError((error) => of(ReservationsActions.getByIdError({ problemDetails: error.error})))
      )),
    )
  );

  openAddReservationDialog$ = createEffect(() => this._actions$.pipe(
    ofType(OpenDialogActions.openAddDialog),
    takeUntil(this._destroy$),
    exhaustMap(({ reservation }) => {
      const dialogRef: MatDialogRef<EditDialogComponent, Reservation> = this._dialog.open(EditDialogComponent, {
        data: {
          reservation
        },
      });
      return dialogRef.afterClosed();
    }),
    map(( reservation ) => {
      if (reservation) {
        return ReservationsActions.add({ reservation });
      }
      return OpenDialogActions.actionCanceled();
    })
  ));

  openEditReservationDialog$ = createEffect(() => this._actions$.pipe(
    ofType(OpenDialogActions.openUpdateDialog),
    takeUntil(this._destroy$),
    exhaustMap(({ reservation }) => {
      const dialogRef: MatDialogRef<EditDialogComponent, Reservation> = this._dialog.open(EditDialogComponent, {
        data: {
          reservation
        },
      });
      return dialogRef.afterClosed();
    }),
    map((reservation) => {
      if (reservation) {
        return ReservationsActions.update({ reservation });
      }
      return OpenDialogActions.actionCanceled();
    })
  ));

  openDeleteReservationDialog$ = createEffect(() => this._actions$.pipe(
    ofType(OpenDialogActions.openDeleteDialog),
    takeUntil(this._destroy$),
    exhaustMap(({ reservation }) => {
      const dialogRef: MatDialogRef<DeleteDialogComponent, Reservation> = this._dialog.open(DeleteDialogComponent, {
        data: {
          reservation
        },
      });
      return dialogRef.afterClosed();
    }),
    map((reservation) => {
      if (reservation) {
        return ReservationsActions.delete({ reservation });
      }
      return OpenDialogActions.actionCanceled();
    })
  ));

  addReservation$ = createEffect(() => this._actions$.pipe(
    ofType(ReservationsActions.add),
    exhaustMap((action) => this._reservationsService.add(action.reservation)
      .pipe(
        map((reservation: Reservation) => ReservationsActions.addSuccess({ reservation })),
        catchError((error) => of(ReservationsActions.addError({ problemDetails: error.error})))
      ))
    )
  );

  addReservationSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(ReservationsActions.addSuccess),
    map(() => OpenDialogActions.openSuccessDialog({ message: Messages.INFO_ADDED })),
  ));

  addReservationError$ = createEffect(() => this._actions$.pipe(
    ofType(ReservationsActions.addError),
    map(({ problemDetails }) => OpenDialogActions.openErrorDialog({ problemDetails })),
  ));

  updateReservation$ = createEffect(() => this._actions$.pipe(
    ofType(ReservationsActions.update),
    exhaustMap((action) => this._reservationsService.update(action.reservation)
      .pipe(
        map(() => ReservationsActions.updateSuccess({ reservation: action.reservation })),
        catchError((error) => of(ReservationsActions.updateError({ problemDetails: error.error})))
      ))
    )
  );

  updateReservationSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(ReservationsActions.updateSuccess),
    map(() => OpenDialogActions.openSuccessDialog({ message: Messages.INFO_UPTDATED })),
  ));

  updateReservationError$ = createEffect(() => this._actions$.pipe(
    ofType(ReservationsActions.updateError),
    map(({ problemDetails }) => OpenDialogActions.openErrorDialog({ problemDetails })),
  ));

  deleteReservation$ = createEffect(() => this._actions$.pipe(
    ofType(ReservationsActions.delete),
    exhaustMap((action) => this._reservationsService.delete(action.reservation)
      .pipe(
        map(() => ReservationsActions.deleteSuccess({ id: action.reservation.id! })),
        catchError((error) => of(ReservationsActions.deleteError({ problemDetails: error.error})))
      ))
    )
  );

  deleteReservationSuccess$ = createEffect(() => this._actions$.pipe(
    ofType(ReservationsActions.deleteSuccess),
    map(() => OpenDialogActions.openSuccessDialog({ message: Messages.INFO_DELETED })),
  ));

  deleteReservationError$ = createEffect(() => this._actions$.pipe(
    ofType(ReservationsActions.deleteError),
    map(({ problemDetails }) => OpenDialogActions.openErrorDialog({ problemDetails })),
  ));

  openSuccessDialog$ = createEffect(() => this._actions$.pipe(
      ofType(OpenDialogActions.openSuccessDialog),
      takeUntil(this._destroy$),
      exhaustMap(({message}) => {
        const dialogRef: MatDialogRef<SuccessDialogComponent, boolean> = this._dialog.open(SuccessDialogComponent);
        dialogRef.componentInstance.message = message;
        return dialogRef.afterClosed();
      }),
      map(() => ReservationsActions.getAll()),
    )
  );

  openErrorDialog$ = createEffect(() => this._actions$.pipe(
      ofType(OpenDialogActions.openErrorDialog),
      takeUntil(this._destroy$),
      exhaustMap(({ problemDetails }) => {
        const dialogRef: MatDialogRef<ErrorDialogComponent, any> = this._dialog.open(ErrorDialogComponent, {});
        dialogRef.componentInstance.problemDetails = problemDetails;
        return dialogRef.afterClosed();
      }),
      map(() => OpenDialogActions.actionCanceled()),
    )
  );
}
