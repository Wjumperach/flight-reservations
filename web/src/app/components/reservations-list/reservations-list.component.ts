import { Component, Input, Output, OnInit, OnDestroy, EventEmitter, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, Sort, MatSortable } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

import { Reservation } from '../../models/reservation';
import { ToTicketClassPipe } from '../../pipes/toticketclass.pipe';
import { ListTitles, ButtonNames, ReservationFormFields, ReservationTableHeaders, TableMessages } from '../../consts/consts';
import { DATE_FORMAT } from '../../reservation.configuration';

@Component({
    selector: 'app-reservations-list',
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

  @Input({required: true})
  sort: {
    active: string,
    direction: string
  } | null = {
    active: '',
    direction: ''
  };

  @Input({required: true})
  pageInfo: {
    pageIndex: number,
    pageSize: number
  } | null = {
    pageIndex: 0,
    pageSize: 10
  };

  @Output()
  openAddDialog: EventEmitter<Reservation> = new EventEmitter<Reservation>();

  @Output()
  openUpdateDialog: EventEmitter<Reservation> = new EventEmitter<Reservation>();

  @Output()
  openDeleteDialog: EventEmitter<Reservation> = new EventEmitter<Reservation>();

  @Output()
  setSort: EventEmitter<Sort> = new EventEmitter<Sort>();

  @Output()
  setPageInfo: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @ViewChild(MatSort)
  matSort: MatSort = new MatSort();

  @ViewChild(MatPaginator) 
  matPaginator: MatPaginator | null = null;

  readonly ListTitles = ListTitles;
  readonly ButtonNames = ButtonNames;
  readonly ReservationFormFields = ReservationFormFields;
  readonly ReservationTableHeaders = ReservationTableHeaders;
  readonly TableMessages = TableMessages;
  readonly DATE_FORMAT = DATE_FORMAT;

  displayedColumns: string[] = [
    //ReservationFormFields.ID, // Oczywiście można też wyświetlać tę kolumnę
    ReservationFormFields.FIRST_NAME,
    ReservationFormFields.LAST_NAME,
    ReservationFormFields.FLIGHT_NUMBER,
    ReservationFormFields.DEPARTURE_DATE_TIME,
    ReservationFormFields.ARRIVAL_DATE_TIME,
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
          this.sortAndPaginate(this.dataSource);
        }
      );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.sortAndPaginate(this.dataSource);
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

  changeSort(sort: Sort): void {
    this.setSort.emit(sort);
  }

  changePageInfo(event: PageEvent): void {
    this.setPageInfo.emit(event);
  }

  private sortAndPaginate(dataSource: MatTableDataSource<Reservation>): void {
    this.matSort.sort(({ id: this.sort?.active ?? '', start: this.sort?.direction ?? ''}) as MatSortable);
    dataSource.sort = this.matSort;
    dataSource.paginator = this.matPaginator;
  }
}
