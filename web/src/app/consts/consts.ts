export const ButtonNames = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
    OK: 'OK',
    SAVE: 'SAVE',
    CANCEL: 'CANCEL',
    CLOSE: 'CLOSE'
};

export const ReservationFormFields = {    
    ID: 'id',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    FLIGHT_NUMBER: 'flightNumber',
    DEPARTURE_DATE_TIME: 'departureDateTime',
    ARRIVAL_DATE_TIME: 'arrivalDateTime',
    TICKET_CLASS: 'ticketClass',
    ACTIONS: 'actions'
};

export const ReservationTableHeaders = {
    ID: 'Id',
    FIRST_NAME: 'First name',
    LAST_NAME: 'Last name',
    FLIGHT_NUMBER: 'Flight number',
    DEPARTURE_DATE_TIME: 'Departure date',
    DEPARTURE_DATE: 'Departure date',
    DEPARTURE_TIME: 'Departure time',
    ARRIVAL_DATE_TIME: 'Arrival date',
    ARRIVAL_DATE: 'Arrival date',
    ARRIVAL_TIME: 'Arrival time',
    TICKET_CLASS: 'Ticket class',
    ACTIONS: 'Actions'
}

export const TableMessages = {
    NO_DATA: "No data matching the filter."
}

export const Messages = {
    CONFIRM: 'The reservation will be deleted permanently',
    INFO_ADDED: 'Reservation has been added.',
    INFO_UPTDATED: 'Reservation has been updated.',
    INFO_DELETED: 'Reservation has been deleted.',
}

export const ListTitles = {
    RESERVATIONS: 'RESERVATIONS'
}

export const DialogTitles = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    CONFIRM: 'Are you sure you want to delete?',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR', 
}

export const ErrorMessages = {
    REQUIRED: 'You must enter a value',
    MIN_LENGTH: 'You must enter at least 2 letters',
    VALUE_NOT_VALID: 'The value is not valid',
    DEPARTURE_DATE_REQUIRED: 'You must enter departure date',
    ARRIVAL_DATE_REQUIRED: 'You must enter arrival date',
    NOT_FROM_FUTURE: 'The date must be today or in the future.'
}
