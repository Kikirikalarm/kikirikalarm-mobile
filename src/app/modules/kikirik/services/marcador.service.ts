import { Injectable } from '@angular/core';
import { Marcador } from '../models/marcador.model';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcadorService {

  private jsonUrl = 'assets/kikirik/data/marcadores.json';
  private marcadores: Marcador[] = [];

  constructor(private http: HttpClient) { }

  async getMarcadorService(): Promise<Marcador[]> {
    let marcadores$ = this.http.get<Marcador[]>(this.jsonUrl);
    this.marcadores = await lastValueFrom(marcadores$);;
    return this.marcadores;
  }

  public get getMarcadores(): Marcador[] {
    return this.marcadores
  }
}
