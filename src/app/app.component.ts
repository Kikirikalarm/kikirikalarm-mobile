import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './modules/login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    const isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';
    this.toggleMaterialTheme(isDarkTheme);
    this.validarStateLogin();
  }

  initializeApp() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.toggleMaterialTheme(prefersDark.matches);

    prefersDark.addEventListener('change', (mediaQuery) => {
      this.toggleMaterialTheme(mediaQuery.matches);
    });
  }

  toggleMaterialTheme(isDark: boolean) {
    const themeClass = isDark ? 'dark-theme' : 'light-theme';
    document.body.classList.add(themeClass);
    document.body.classList.remove(isDark ? 'light-theme' : 'dark-theme');
    localStorage.setItem('isDarkTheme', isDark.toString());
  }

  validarStateLogin() {
    const isLoggedIn = this.loginService.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['/kikirik']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
