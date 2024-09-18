import { Injectable } from '@angular/core';
import { ConfigAlarma } from '../models/config-alarma.model';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private jsonUrl = 'assets/kikirik/data/config.json';
  private configAlarm: ConfigAlarma | null = null;

  constructor(private http: HttpClient) { }

  async getConfigService(): Promise<ConfigAlarma> {
    let configAlarm$ = this.http.get<ConfigAlarma>(this.jsonUrl);
    this.configAlarm = await lastValueFrom(configAlarm$);
    return this.configAlarm;
  }

  public get configAlarmService(): ConfigAlarma | null {
    return this.configAlarm;
  }

  public set configAlarmService(value: ConfigAlarma | null) {
    this.configAlarm = value;
  }
}
