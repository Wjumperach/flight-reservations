import { Component } from '@angular/core';
import { MatDialogModule, MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogTitles, ButtonNames } from '../../consts/consts';
import { ProblemDetails } from '../../models/problemdetails';
import { ToErrorListPipe } from '../../pipes/toerrorlist.pipe';

@Component({
    selector: 'app-error-dialog',
    imports: [MatDialogModule, MatDialogClose, MatButtonModule, ToErrorListPipe],
    templateUrl: './error-dialog.component.html',
    styleUrl: './error-dialog.component.css'
})
export class ErrorDialogComponent {
  readonly DialogTitles = DialogTitles;
  readonly ButtonNames = ButtonNames;
  
  problemDetails: ProblemDetails | null = null;
}
