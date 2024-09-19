import { Component, Input, OnInit } from '@angular/core';
import { Alarma } from '../../models/alarma.model';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { AlarmasService } from '../../services/alarmas.service';

@Component({
  selector: 'app-editar-alarma',
  templateUrl: './editar-alarma.component.html',
  styleUrls: ['./editar-alarma.component.scss'],
})
export class EditarAlarmaComponent implements OnInit {
  selectedTimes: any;

  @Input() alarma?: Alarma;
  alarmaForm: FormGroup = this.fb.group({});
  formatoHora: 12 | 24 = this.configService.configAlarmService!.formatoHora || 12;

  constructor(
    private modalCtrl: ModalController,
    private configService: ConfigService,
    private fb: FormBuilder,
    private alarmasService: AlarmasService
  ) { }

  ngOnInit() {
    console.log("alarma", this.alarma);
    console.log("formato Hora", this.formatoHora);
    this.iniciarFormulario();
    this.llenarFormulario(this.alarma!);
  }

  iniciarFormulario() {
    this.alarmaForm = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      hora: ['', Validators.required],
      activa: [false, Validators.required],
      horaDate: [null, Validators.required],
      dias: [{
        lunes: true,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: false,
        domingo: false,
      }, Validators.required],
      marcador: this.fb.group({
        nombre: [''],
        icono: [''],
        color: [''],
      }),
      pausas: this.fb.array([])
    });
  }

  llenarFormulario(alarma: Alarma) {
    if (this.alarma) {
      this.alarmaForm.patchValue({
        id: alarma.id,
        nombre: alarma.nombre,
        hora: alarma.hora,
        activa: alarma.activa,
        horaDate: alarma.horaDate,
        dias: alarma.dias,
        marcador: alarma.marcador
      });
    }
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    let alarma: Alarma = this.alarmaForm.value;
    this.alarmasService.updateAlarm = alarma;
    return this.modalCtrl.dismiss(this.alarma, 'confirm');
  }

  convertirFormato24H(hora: string): string {
    // Verificamos si la hora tiene formato "a. m." o "p. m."
    let amPmMatch = hora.match(/(\d{1,2}):(\d{2})\s*(a\.?\s*m\.?|p\.?\s*m\.?)/i);

    if (amPmMatch) {
      let horas = parseInt(amPmMatch[1], 10);
      let minutos = amPmMatch[2];
      let periodo = amPmMatch[3].toLowerCase();

      if (periodo.includes("p") && horas !== 12) {
        horas += 12; // Convertimos las horas de PM
      } else if (periodo.includes("a") && horas === 12) {
        horas = 0; // Convertimos las 12 a.m. a 00 horas
      }

      return `${horas.toString().padStart(2, '0')}:${minutos}`;
    }

    // Si la hora ya está en formato 24 horas, simplemente la retornamos
    let formato24HorasMatch = hora.match(/^\d{1,2}:\d{2}$/);
    if (formato24HorasMatch) {
      let [horas, minutos] = hora.split(":").map(Number);
      return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    }

    throw new Error("Formato de hora no válido");
  }

  cambioFecha(event: any) {
    console.log(event);
    let hora = this.convertirFormato24H(event);
    this.alarmaForm.get('horaDate')?.setValue(new Date(`2000-01-01T${hora}`));
    this.alarmaForm.get('hora')?.setValue(hora);
  }


  public iconoHora(): string {
    let hora = new Date(this.alarmaForm.get('horaDate')!.value);
    return hora.getHours() < 12 ? 'sunny' : 'bedtime'
  }
}
