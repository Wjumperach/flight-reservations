import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogTitles, ButtonNames } from '../../consts/consts';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [MatDialogModule, MatDialogClose, MatButtonModule ],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css'
})
export class SuccessDialogComponent {
  readonly DialogTitles = DialogTitles;
  readonly ButtonNames = ButtonNames;
  
  message: string = '';
}
