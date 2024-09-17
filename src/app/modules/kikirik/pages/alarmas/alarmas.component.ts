import { Component, OnInit } from '@angular/core';
import { AlarmasService } from '../../services/alarmas.service';
import { Alarma } from '../../models/alarma.model';

@Component({
  selector: 'app-alarmas',
  templateUrl: './alarmas.component.html',
  styleUrls: ['./alarmas.component.scss'],
})
export class AlarmasComponent implements OnInit {
  alarmas: Alarma[] = [];
  constructor(
    private alarmasService: AlarmasService,
  ) { }

  ngOnInit() {
    this.obtenerAlarmas();
  }

  obtenerAlarmas() {
    this.alarmas = this.alarmasService.getAlarmas;
    console.log("alarmas", this.alarmas);
  }


  public iconoHora(alarma: Alarma): string {
    alarma.horaDate = new Date(alarma.horaDate);
    return alarma.horaDate.getHours() < 12 ? 'sunny' : 'bedtime'
  }

  obtenerDiasRecurrentes(alarma: Alarma): string {
    const diasAbreviados = {
      lunes: 'lun',
      martes: 'mar',
      miercoles: 'mié',
      jueves: 'jue',
      viernes: 'vie',
      sabado: 'sáb',
      domingo: 'dom'
    };

    const diasSeleccionados = Object.keys(alarma.dias).filter(dia => alarma.dias[dia as keyof typeof alarma.dias]);

    if (diasSeleccionados.length === 0) {
      return 'hoy';
    }

    if (diasSeleccionados.length === 7) {
      return 'todos los días';
    }

    return diasSeleccionados.map(dia => diasAbreviados[dia as keyof typeof diasAbreviados]).join(', ');
  }
}
