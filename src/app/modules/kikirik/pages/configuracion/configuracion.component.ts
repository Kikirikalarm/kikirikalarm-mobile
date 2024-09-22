import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/login/services/login.service';
import { OptionsConfirm } from 'src/app/shared/models/dialog-confirm-options.model';
import { DialogConfirmServiceService } from 'src/app/shared/services/dialog-confirm-service.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent {

  constructor(
    private LoginService: LoginService,
    private dialogConfirmServiceService: DialogConfirmServiceService,
    private router: Router
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

  private logout() {
    this.LoginService.logout();
    this.router.navigate(['/login']);
  }
}
