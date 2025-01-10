export interface Reservation {
    id?: number | null;
    firstName: string;
    lastName: string;
    flightNumber: string;
    departureDateTime: string | null;
    arrivalDateTime: string | null;
    ticketClass: number | null;
}