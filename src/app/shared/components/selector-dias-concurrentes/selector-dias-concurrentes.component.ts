import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

type Days = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

@Component({
  selector: 'app-selector-dias-concurrentes',
  templateUrl: './selector-dias-concurrentes.component.html',
  styleUrls: ['./selector-dias-concurrentes.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectorDiasConcurrentesComponent),
    }
  ]
})
export class SelectorDiasConcurrentesComponent {
  daysToShow: { key: string, value: string }[] = [
    { key: 'L', value: 'lunes' },
    { key: 'M', value: 'martes' },
    { key: 'M', value: 'miercoles' },
    { key: 'J', value: 'jueves' },
    { key: 'V', value: 'viernes' },
    { key: 'S', value: 'sabado' },
    { key: 'D', value: 'domingo' }
  ];

  days: Record<Days, boolean> = {
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false,
  };

  constructor() { }


  private onChange: (value: any) => void = () => { };
  private onTouched: () => void = () => { };

  // Escribir el valor desde el formulario
  writeValue(value: any): void {
    if (value) {
      this.days = { ...this.days, ...value };
    }
  }

  // Registrar el cambio en el valor
  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  // Registrar cuando el campo es tocado
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Habilitar/deshabilitar el componente (opcional)
  setDisabledState?(isDisabled: boolean): void {
    // Implementa lógica si necesitas deshabilitar los botones
  }
  toggleDay(daySelected: any) {
    let day = daySelected as Days;
    // Alternar el estado de un día
    this.days[day] = !this.days[day];
    this.onChange(this.days); // Notificar al formulario sobre el cambio
    this.onTouched();
  }

  dayActive(daySelected: string) {
    let day = daySelected as Days;
    return { 'button-day-selected': this.days[day], 'mat-elevation-z2': this.days[day] }
  }
}
