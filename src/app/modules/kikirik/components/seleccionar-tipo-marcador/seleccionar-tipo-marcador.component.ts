import { Component, Inject, OnInit } from '@angular/core';
import { Marcador } from '../../models/marcador.model';
import { MarcadorService } from '../../services/marcador.service';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-seleccionar-tipo-marcador',
  templateUrl: './seleccionar-tipo-marcador.component.html',
  styleUrls: ['./seleccionar-tipo-marcador.component.scss'],
})
export class SeleccionarTipoMarcadorComponent implements OnInit {

  marcadores: Marcador[] = [];
  marcadorForm: FormControl = new FormControl(null);

  constructor(
    public dialogRef: MatDialogRef<SeleccionarTipoMarcadorComponent>,
    private service: MarcadorService,
    @Inject(MAT_DIALOG_DATA) public data?: Marcador) { }

  ngOnInit() {
    this.marcadores = this.service.getMarcadores;

    if (this.data) {
      let marcador = this.marcadores.filter(f => f.nombre == this.data!.nombre);
      this.marcadorForm.setValue(marcador);
    }
  }

  optionSelected() {
    this.dialogRef.close(this.marcadorForm.value[0]);
  }

}
