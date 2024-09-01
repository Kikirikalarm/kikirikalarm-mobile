import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {
    this.initializeApp();
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

  ngOnInit() {
    const isDarkTheme = localStorage.getItem('isDarkTheme') === 'true';
    this.toggleMaterialTheme(isDarkTheme);
  }
}
