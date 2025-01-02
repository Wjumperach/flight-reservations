import { Pipe, PipeTransform } from '@angular/core';

import { TicketClasses } from '../models/ticketclass';

@Pipe({
    name: 'toTicketClass',
    standalone: true,
})
export class ToTicketClassPipe implements PipeTransform {
    transform(id: number): string {
        return TicketClasses.find(t => t.id === id)?.name ?? '';
    }
  }