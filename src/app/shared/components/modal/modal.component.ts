import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DIALOG_RESPONSE, DIALOG_TYPES } from '../../enums/dialog.enum';
import { DialogOptions } from '../../model/dialog-model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public DIALOG_TYPES = DIALOG_TYPES;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogOptions,
    public dialogRef: MatDialogRef<ModalComponent>
  ) { }

  ngOnInit(): void {
    console.log('modal data', this.data);
  }

  clickAction(mainButton = true){
    this.dialogRef.close(mainButton ? DIALOG_RESPONSE.ACCEPT : DIALOG_RESPONSE.CANCEL);
  }

}
