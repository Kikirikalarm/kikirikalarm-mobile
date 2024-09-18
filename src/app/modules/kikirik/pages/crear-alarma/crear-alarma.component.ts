import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Alarma } from '../../models/alarma.model';

@Component({
  selector: 'app-crear-alarma',
  templateUrl: './crear-alarma.component.html',
  styleUrls: ['./crear-alarma.component.scss'],
})
export class CrearAlarmaComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    let alarma: Alarma = {} as Alarma;
    return this.modalCtrl.dismiss(alarma, 'confirm');
  }

}
