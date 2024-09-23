import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-vista-previa-alarma',
  templateUrl: './vista-previa-alarma.component.html',
  styleUrls: ['./vista-previa-alarma.component.scss'],
})
export class VistaPreviaAlarmaComponent {
  currentDate = new Date();
  constructor(
    private modalCtrl: ModalController,
    private configService: ConfigService
  ) { }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  get formatoHora() {
    return this.configService.configAlarm!.formatoHora || 12;
  }

  public get iconoHora(): string {
    let hora = this.currentDate;
    return hora.getHours() < 12 ? 'sunny' : 'bedtime'
  }

  get tamanioBoton() {
    return this.configService.configAlarm?.tamConfigButton || 'small';
  }


}
