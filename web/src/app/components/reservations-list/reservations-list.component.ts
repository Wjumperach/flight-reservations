import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

import { Reservation } from '../../models/reservation';
import { ToTicketClassPipe } from '../../pipes/toticketclass.pipe';
import { ListTitles, ButtonNames, ReservationFormFields, ReservationTableHeaders, TableMessages } from '../../consts/consts';
import { DATE_FORMAT, DATE_FORMATS } from '../../reservation.configuration';

@Component({
  selector: 'app-reservations-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    DatePipe,
    ToTicketClassPipe
  ],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReservationsListComponent implements OnInit, OnDestroy, AfterViewInit {
  private _destroy$: Subject<void> = new Subject<void>();

  @Input({required: true})
  reservations: Observable<Reservation[]> = new Observable<Reservation[]>();

  @Output()
  openAddDialog: EventEmitter<Reservation> = new EventEmitter<Reservation>();

  @Output()
  openUpdateDialog: EventEmitter<Reservation> = new EventEmitter<Reservation>();

  @Output()
  openDeleteDialog: EventEmitter<Reservation> = new EventEmitter<Reservation>();

  @ViewChild(MatSort)
  sort: MatSort | null = null;

  @ViewChild(MatPaginator) 
  paginator: MatPaginator | null = null;

  readonly ListTitles = ListTitles;
  readonly ButtonNames = ButtonNames;
  readonly ReservationFormFields = ReservationFormFields;
  readonly ReservationTableHeaders = ReservationTableHeaders;
  readonly TableMessages = TableMessages;
  readonly DATE_FORMAT = DATE_FORMAT;
  readonly dateFormats = DATE_FORMATS;

  displayedColumns: string[] = [
    //ReservationFormFields.ID, // Oczywiście można też wyświetlać tę kolumnę
    ReservationFormFields.FIRST_NAME,
    ReservationFormFields.LAST_NAME,
    ReservationFormFields.FLIGHT_NUMBER,
    ReservationFormFields.DEPARTURE_DATE,
    ReservationFormFields.ARRIVAL_DATE,
    ReservationFormFields.TICKET_CLASS,
    ReservationFormFields.ACTIONS
  ];
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource<Reservation>();

  ngOnInit(): void {
    this.reservations
      .pipe(takeUntil(this._destroy$)) 
      .subscribe(
        (reservations) => {
          this.dataSource = new MatTableDataSource(reservations);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;   
        }
      );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  addRow(): void {
    this.openAddDialog.emit();
  }

  editRow(reservation: Reservation): void {
    this.openUpdateDialog.emit(reservation);
  }

  removeRow(reservation: Reservation): void {
    this.openDeleteDialog.emit(reservation);
  }
}
