import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-seleccionar-duracion-notificacion',
  templateUrl: './seleccionar-duracion-notificacion.component.html',
  styleUrls: ['./seleccionar-duracion-notificacion.component.scss'],
})
export class SeleccionarDuracionNotificacionComponent  implements OnInit {

  listaDuracion:number[] = [1, 5, 10, 15, 20, 25];
  seleccionDuracion: FormControl = new FormControl(null);

  constructor(
    public dialogRef: MatDialogRef<SeleccionarDuracionNotificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: number,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  optionSelected(){
    this.dialogRef.close(this.seleccionDuracion.value[0]);
  }

  ngOnInit() {
    if (this.data) {
      let itemSeleccionado = this.listaDuracion.filter(f => f == this.data);
      this.seleccionDuracion.setValue(itemSeleccionado);
    }
  }

}
