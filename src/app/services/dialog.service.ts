import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatConfirmDialogComponent } from '../mat-confirm-dialog/mat-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(dialogMessage) {
    return this.dialog.open(MatConfirmDialogComponent, {
      width: '400px',
      disableClose: true,
      data: {
        message: dialogMessage
      }
    });
  }
}
