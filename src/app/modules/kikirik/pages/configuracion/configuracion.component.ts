import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { OptionsConfirm } from 'src/app/shared/models/dialog-confirm-options.model';
import { DialogConfirmServiceService } from 'src/app/shared/services/dialog-confirm-service.service';
import { SeleccionarFormatoHoraComponent } from '../../components/seleccionar-formato-hora/seleccionar-formato-hora.component';
import { SeleccionarDuracionNotificacionComponent } from '../../components/seleccionar-duracion-notificacion/seleccionar-duracion-notificacion.component';
import { SeleccionarTamanioBotonComponent } from '../../components/seleccionar-tamanio-boton/seleccionar-tamanio-boton.component';
import { ConfigService } from '../../services/config.service';
import { ConfigAlarma } from '../../models/config-alarma.model';
import { ModalController } from '@ionic/angular';
import { VistaPreviaAlarmaComponent } from '../vista-previa-alarma/vista-previa-alarma.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent implements OnInit {

  configuracion: ConfigAlarma | null = null;

  constructor(
    private LoginService: LoginService,
    private dialogConfirmServiceService: DialogConfirmServiceService,
    private router: Router,
    private dialog: MatDialog,
    private service: ConfigService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit(): void {
    this.configuracion = this.service.configAlarm;
  }

  async showLogoutModal() {
    let options: OptionsConfirm = {
      tituloBtnConfirmar: 'Si',
      tituloBtnCancelar: 'No',
      width: '280px',
    }
    let confirmacion = await this.dialogConfirmServiceService.succesConfirmMessaje('¿Esta seguro de cerrar sesión?', options);
    console.log(confirmacion);
    if (confirmacion) {
      this.logout()
    }
  }

  showHourFormatModal() {
    const dialogRef = this.dialog.open(SeleccionarFormatoHoraComponent, {
      data: this.configuracion?.formatoHora,
      autoFocus: false,
      width: "280px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("config", result)
        this.configuracion!.formatoHora = result;
        this.service.configAlarm = this.configuracion!;
      }
    })
  }

  showDurationModal() {
    const dialogRef = this.dialog.open(SeleccionarDuracionNotificacionComponent, {
      data: this.configuracion?.duracionAlarma,
      autoFocus: false,
      width: "280px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("config", result)
        this.configuracion!.duracionAlarma = result;
        this.service.configAlarm = this.configuracion!;
      }
    })
  }

  showButtonSizeDialog() {
    console.log("modal botones");
    const dialogRef = this.dialog.open(SeleccionarTamanioBotonComponent, {
      data: this.configuracion?.tamConfigButton,
      autoFocus: false,
      width: "280px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("config", result)
        this.configuracion!.tamConfigButton = result;
        this.service.configAlarm = this.configuracion!;
      }
    })
  }

  private logout() {
    this.LoginService.logout();
    this.router.navigate(['/login']);
  }

  async showPreviewAlarm() {
    const modal = await this.modalCtrl.create({
      component: VistaPreviaAlarmaComponent,
    });
    modal.present();
  }
}
