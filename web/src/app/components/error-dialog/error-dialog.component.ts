import { Component } from '@angular/core';
import { MatDialogModule, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogTitles, ButtonNames } from '../../consts/consts';
import { Error } from '../../models/error';
import { ToErrorListPipe } from '../../pipes/toerrorlist.pipe';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [ MatDialogModule, MatDialogClose, MatButtonModule, ToErrorListPipe ],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css'
})
export class ErrorDialogComponent {
  readonly DialogTitles = DialogTitles;
  readonly ButtonNames = ButtonNames;
  
  error: Error | null = null;
}
