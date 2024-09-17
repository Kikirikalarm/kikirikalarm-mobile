import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-seleccion-hora-dialog',
  templateUrl: './seleccion-hora-dialog.component.html',
  styleUrls: ['./seleccion-hora-dialog.component.scss'],
})
export class SeleccionHoraDialogComponent implements OnInit {
  controlDate?: FormControl;
  currentYear = new Date().getFullYear();
  maxYear = `${this.currentYear + 20}-12-31`;
  minYear = `${this.currentYear - 20}-01-01`;

  constructor(
    public dialogRef: MatDialogRef<SeleccionHoraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { selectedDate: Date },
  ) { }

  ngOnInit() {
    if (this.data.selectedDate) {
      console.log(this.data);
      this.controlDate = new FormControl(this.data.selectedDate.toISOString().slice(0, 10));
    }
  }

  closeModal() {
    this.dialogRef.close(null);
  }

  saveDate() {
    this.dialogRef.close(this.controlDate?.value);
  }
}
