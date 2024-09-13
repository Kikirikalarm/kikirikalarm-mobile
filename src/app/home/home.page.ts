import { Component } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  textInput: string = '';
  error: any;
  hasPermission: any;
  validMicrophone = false;


  //selector de color
  public color = '919191';
  colorCtr = new FormControl(null);

  constructor() {
    this.checkPermission();
  }

  async checkPermission() {
    this.validMicrophone = Capacitor.isNativePlatform();
    if (Capacitor.isNativePlatform()) {
      const hasPermission = await SpeechRecognition.checkPermissions();
      this.hasPermission = hasPermission;
      if (hasPermission.speechRecognition != 'granted') {
        await SpeechRecognition.requestPermissions();
      }
    }
  }

  async startListening() {
    if (!this.validMicrophone) {
      return;
    }
    const available = await SpeechRecognition.available();
    if (available.available) {
      SpeechRecognition.start({
        language: "es-CO",
        maxResults: 2,
        prompt: "Say something",
        partialResults: true,
        popup: true,
      }).then((result) => {
        this.textInput = result.matches ? result.matches.join(' ') : '';
      }).catch((error) => {
        console.error('Error en el reconocimiento de voz:', error);
        this.error = error;
      });
    }
  }



}
