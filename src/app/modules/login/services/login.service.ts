import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn: boolean = false;

  constructor() { }

  login() {
    sessionStorage.setItem('autenticado', 'true');
    this.loggedIn = true;
  }

  logout() {
    sessionStorage.removeItem('autenticado');
    this.loggedIn = false;
  }

  isLoggedIn() {
    this.loggedIn = sessionStorage.getItem('autenticado') === 'true';
    return this.loggedIn;
  }
}
