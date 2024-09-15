import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/modules/login/services/login.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
})
export class ConfiguracionComponent {

  constructor(
    private LoginService: LoginService,
    private router: Router
  ) { }


  logout() {
    this.LoginService.logout();
    this.router.navigate(['/login']);
  }
}
