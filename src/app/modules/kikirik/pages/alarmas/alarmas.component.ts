import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../../services/alarmas.service';
import { Alarma } from '../../models/alarma.model';
import { DialogConfirmServiceService } from 'src/app/shared/services/dialog-confirm-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OptionsConfirm } from '../../../../shared/models/dialog-confirm-options.model';
import { ModalController } from '@ionic/angular';
import { CrearAlarmaComponent } from '../crear-alarma/crear-alarma.component';
import { EditarAlarmaComponent } from '../editar-alarma/editar-alarma.component';

@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.component.html',
  styleUrls: ['./alarmas.component.scss'],
})
export class AlarmasComponent implements OnInit {
  alarmas: Alarma[] = [];
  constructor(
    private alarmasService: AlarmasService,
    private dialogConfirmServiceService: DialogConfirmServiceService,
    private snackBar: MatSnackBar,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.obtenerAlarmas();
  }

  obtenerAlarmas() {
    this.alarmas = this.alarmasService.getAlarmas;
  }


  public iconoHora(alarma: Alarma): string {
    alarma.horaDate = new Date(alarma.horaDate);
    return alarma.horaDate.getHours() < 12 ? 'sunny' : 'bedtime'
  }

  obtenerDiasRecurrentes(alarma: Alarma): string {
    const diasAbreviados = {
      lunes: 'lun',
      martes: 'mar',
      miercoles: 'mié',
      jueves: 'jue',
      viernes: 'vie',
      sabado: 'sáb',
      domingo: 'dom'
    };

    const diasSeleccionados = Object.keys(alarma.dias).filter(dia => alarma.dias[dia as keyof typeof alarma.dias]);

    if (diasSeleccionados.length === 0) {
      return 'hoy';
    }

    if (diasSeleccionados.length === 7) {
      return 'todos los días';
    }

    return diasSeleccionados.map(dia => diasAbreviados[dia as keyof typeof diasAbreviados]).join(', ');
  }

  async eliminarAlarma(alarma: Alarma) {
    let options: OptionsConfirm = {
      tituloBtnConfirmar: 'SI',
      tituloBtnCancelar: 'NO',
      width: '280px',
    }
    let confirmacion = await this.dialogConfirmServiceService.succesConfirmMessaje('¿Esta seguro de eliminar la alarma?', options);
    console.log(confirmacion);
    if (confirmacion) {
      this.alarmasService.eliminarAlarma(alarma);
      this.obtenerAlarmas();
      this.snackBar.open('Se ha eliminado la alarma', '', { panelClass: 'snack-bar-propio', duration: 2000 });
    }
  }

  async mostrarEditar(alarma: Alarma) {
    const modal = await this.modalCtrl.create({
      component: EditarAlarmaComponent,
      componentProps: {
        alarma: alarma
      }
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.alarmasService.updateAlarm = data;
      this.obtenerAlarmas();
      this.snackBar.open('Se ha guardado la alarma correctamente', '', { panelClass: 'snack-bar-propio', duration: 2000 });
    }
  }

  async mostrarCrear() {
    const modal = await this.modalCtrl.create({
      component: CrearAlarmaComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      //TODO: Implementar la creación de la alarma
      // this.alarmasService.addAlarm = data;
      this.obtenerAlarmas();
      this.snackBar.open('Se ha creado la alarma correctamente', '', { panelClass: 'snack-bar-propio', duration: 2000 });
    }
  }
}
