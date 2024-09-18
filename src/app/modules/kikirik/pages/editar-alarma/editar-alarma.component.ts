import { Component, Input, OnInit } from '@angular/core';
import { Alarma } from '../../models/alarma.model';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-alarma',
  templateUrl: './editar-alarma.component.html',
  styleUrls: ['./editar-alarma.component.scss'],
})
export class EditarAlarmaComponent implements OnInit {
  @Input() alarma?: Alarma;
  form = new FormGroup({
    days: new FormControl({
      lunes: true,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
      domingo: false,
    }, Validators.required),
  });

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("alarma", this.alarma);
    this.llenarFormulario();
  }

  llenarFormulario() {
    if (this.alarma) {
      this.form.patchValue({
        days: this.alarma.dias
      });
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.alarma, 'confirm');
  }

}
