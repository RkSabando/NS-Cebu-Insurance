import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DIALOG_RESPONSE, DIALOG_TYPES } from '../../enums/dialog.enum';
import { DialogOptions } from '../../model/dialog-model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  public DIALOG_TYPES = DIALOG_TYPES;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogOptions,
    public dialogRef: MatDialogRef<ModalComponent>
  ) { }

  clickAction(mainButton = true){
    this.dialogRef.close(mainButton ? DIALOG_RESPONSE.ACCEPT : DIALOG_RESPONSE.CANCEL);
  }

}
