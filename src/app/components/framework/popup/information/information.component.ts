import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'ih-information-popup',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationDialogComponent {
  constructor(public dialogRef: MatDialogRef<InformationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  confirmClick() {
    this.dialogRef.close(true);
  }

}
