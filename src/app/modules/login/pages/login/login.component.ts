import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;
  formLogin = this.formLoginInit();

  constructor(
    private LoginService: LoginService,
    private router: Router
  ) { }

  formLoginInit() {
    return new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  iniciarSesion() {
    this.LoginService.login();
    this.router.navigate(['/kikirik']);
  }

}
