import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn: boolean = false;

  constructor() { }

  login() {
    localStorage.setItem('autenticado', 'true');
    this.loggedIn = true;
  }

  logout() {
    localStorage.removeItem('autenticado');
    this.loggedIn = false;
  }

  isLoggedIn() {
    this.loggedIn = localStorage.getItem('autenticado') === 'true';
    return this.loggedIn;
  }
}
