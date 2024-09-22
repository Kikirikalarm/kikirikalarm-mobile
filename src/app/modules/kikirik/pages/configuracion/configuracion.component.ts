import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { OptionsConfirm } from 'src/app/shared/models/dialog-confirm-options.model';
import { DialogConfirmServiceService } from 'src/app/shared/services/dialog-confirm-service.service';
import { SeleccionarFormatoHoraComponent } from '../../components/seleccionar-formato-hora/seleccionar-formato-hora.component';
import { SeleccionarDuracionNotificacionComponent } from '../../components/seleccionar-duracion-notificacion/seleccionar-duracion-notificacion.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent {

  constructor(
    private LoginService: LoginService,
    private dialogConfirmServiceService: DialogConfirmServiceService,
    private router: Router,
    public dialog: MatDialog
  ) { }

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

  showHourFormatModal(){
    const dialogRef = this.dialog.open(SeleccionarFormatoHoraComponent, {
      data: 12,
      autoFocus: false,
      width: "280px"
    });
    dialogRef.afterClosed().subscribe(result => {if(result){console.log("formato slee",result)}})   
  }

  showDurationModal(){
    const dialogRef = this.dialog.open(SeleccionarDuracionNotificacionComponent, {
      data: 10,
      autoFocus: false,
      width: "280px"
    });
    dialogRef.afterClosed().subscribe(result => {if(result){console.log("formato slee",result)}})   
  }

  private logout() {
    this.LoginService.logout();
    this.router.navigate(['/login']);
  }
}
