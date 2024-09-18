export interface ConfigAlarma {
  tamConfigButton: TamConfigButton;
  duracionAlarma: number;
  formatoHora: 12 | 24;
  destellos: boolean;
  vibracion: boolean;
}

export interface TamConfigButton {
  width: number;
  height: number;
}
