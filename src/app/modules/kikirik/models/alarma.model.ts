import { Marcador } from "./marcador.model";
import { PausaAlarma } from "./pausa-alarma.model";

export interface Alarma {
  id?: number;
  nombre: string;
  hora: string;
  activa: boolean;
  horaDate: Date;
  dias: {
    lunes: boolean;
    martes: boolean;
    miercoles: boolean;
    jueves: boolean;
    viernes: boolean;
    sabado: boolean;
    domingo: boolean;
  }
  marcador: Marcador;
  pausas: PausaAlarma[];
  fechaCreacion: Date;
}

