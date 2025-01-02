import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../../reservation.configuration';
import { Reservation } from '../../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private _http: HttpClient = inject(HttpClient);

  getAll(): Observable<Reservation[]> {
    return this._http.get<Reservation[]>(`${API_URL}Reservation/`);
  }

  getById(id: number): Observable<Reservation> {
    return this._http.get<Reservation>(`${API_URL}Reservation/${id}`);
  }

  add(reservation: Reservation): Observable<Reservation> {
    return this._http.post<Reservation>(`${API_URL}Reservation/`, reservation);
  }

  update(reservation: Reservation): Observable<Reservation> {
    return this._http.put<Reservation>(`${API_URL}Reservation/${reservation.id}`, reservation);
  }

  delete(reservation: Reservation): Observable<number | null | undefined> {
    return this._http.delete<number | null | undefined>(`${API_URL}Reservation/${reservation.id}`);
  } 
}
