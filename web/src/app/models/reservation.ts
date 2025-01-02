export interface Reservation {
    id?: number | null;
    firstName: string;
    lastName: string;
    flightNumber: string;
    departureDate: Date | null;
    arrivalDate: Date | null;
    ticketClass: number | null;
}