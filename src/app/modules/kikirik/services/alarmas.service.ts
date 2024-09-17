import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alarma } from '../models/alarma.model';
import { lastValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmasService {
  private jsonUrl = 'assets/kikirik/data/alarmas.json';
  private alarmas: Alarma[] = [];

  constructor(private http: HttpClient) { }

  async getAlarmasService(): Promise<Alarma[]> {
    let alarmas$ = this.http.get<Alarma[]>(this.jsonUrl);
    let alarmas = await lastValueFrom(alarmas$)
    this.alarmas = alarmas;
    return this.alarmas;
  }

  public get getAlarmas(): Alarma[] {
    return this.alarmas
  }

  public set addAlarm(alarma: Alarma) {
    this.alarmas.push(alarma);
  }

  public getAlarmById(id: number): Alarma | null {
    return this.alarmas.find(alarma => alarma.id === id) ?? null;
  }

  public set updateAlarm(alarma: Alarma) {
    let index = this.alarmas.findIndex(al => al.id === alarma.id);
    this.alarmas[index] = alarma;
  }
}
