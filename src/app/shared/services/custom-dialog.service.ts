import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../components/modal/modal.component';
import { DIALOG_RESPONSE, DIALOG_TYPES } from '../enums/dialog.enum';
import { DialogOptions } from '../model/dialog-model';

@Injectable({
  providedIn: 'root'
})
export class CustomDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(
    dialogOptions: DialogOptions,
    mainAction?: () => void | Promise<void>, 
    secondaryAction?: () => void
  ) {
    console.log('dialogOptions', dialogOptions);
    const dialogRef = this.dialog.open(ModalComponent,
      {
        panelClass: 'custom-dialog',
        data: dialogOptions,
        ...(dialogOptions?.timeout && {disableClose: true})
      },
    );

    if(dialogOptions?.timeout) dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
         dialogRef.close();
      }, dialogOptions?.timeout)
    });

    dialogRef.afterClosed().subscribe( result => {
      if( mainAction && result === DIALOG_RESPONSE.ACCEPT) {
        mainAction();
      } else if( secondaryAction && result === DIALOG_RESPONSE.CANCEL) {
        secondaryAction();
      }
    });


  }
}
