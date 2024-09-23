import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-seleccionar-tamanio-boton',
  templateUrl: './seleccionar-tamanio-boton.component.html',
  styleUrls: ['./seleccionar-tamanio-boton.component.scss'],
})
export class SeleccionarTamanioBotonComponent implements OnInit {

  tamanioBoton: number = 30;
  constructor(
    public dialogRef: MatDialogRef<SeleccionarTamanioBotonComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: number,
  ) { }

  ngOnInit() {
    if (this.data) {
      this.tamanioBoton = this.data;
    }
  }

  changeSizeButton(tamanio: number) {
    if ((this.tamanioBoton + tamanio >= 10) && (this.tamanioBoton + tamanio <= 45)) {
      this.tamanioBoton += tamanio;
    }
    console.log("valor actua:", this.tamanioBoton);
  }

  onCloseModal(){
    this.dialogRef.close(this.tamanioBoton);
  }

}
