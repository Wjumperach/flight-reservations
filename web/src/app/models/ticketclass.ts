export enum TicketClassOptions{
    ECONOMY = 0,
    PREMIUM_ECONOMY = 1,
    BUSINESS = 2,
    FIRST_CLASS = 3
}

export interface TicketClass {
    id: TicketClassOptions;
    name: string;
}

export const TicketClasses: TicketClass[] = [
    { id: TicketClassOptions.ECONOMY, name: 'Economy'},
    { id: TicketClassOptions.PREMIUM_ECONOMY, name: 'Premium economy'},
    { id: TicketClassOptions.BUSINESS, name: 'Business'},
    { id: TicketClassOptions.FIRST_CLASS, name: 'First class'}
  ]