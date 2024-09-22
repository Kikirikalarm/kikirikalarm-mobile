import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-seleccionar-formato-hora',
  templateUrl: './seleccionar-formato-hora.component.html',
  styleUrls: ['./seleccionar-formato-hora.component.scss'],
})
export class SeleccionarFormatoHoraComponent  implements OnInit {

  formatosHora: any[] = [{ "nombre": "AM / PM", "valor": 12 }, { "nombre": "24H", "valor": 24 }];
  seleccionFormato: FormControl = new FormControl(null);

  constructor(
    public dialogRef: MatDialogRef<SeleccionarFormatoHoraComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: 12|24,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  optionSelected(){
    this.dialogRef.close(this.seleccionFormato.value[0].valor);
  }

  ngOnInit() {
    if (this.data) {
      let formatoSeleccionado = this.formatosHora.filter(f => f.valor == this.data);
      this.seleccionFormato.setValue(formatoSeleccionado);
    }
  }

}
