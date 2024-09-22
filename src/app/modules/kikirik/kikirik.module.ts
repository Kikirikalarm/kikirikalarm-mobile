import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KikirikRoutingModule } from './kikirik-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { KikirikComponent } from './components/kikirik/kikirik.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { AlarmasComponent } from './pages/alarmas/alarmas.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { IonicModule } from '@ionic/angular';
import { SeleccionHoraDialogComponent } from './components/seleccion-hora-dialog/seleccion-hora-dialog.component';
import { EditarAlarmaComponent } from './pages/editar-alarma/editar-alarma.component';
import { CrearAlarmaComponent } from './pages/crear-alarma/crear-alarma.component';
import { VistaPreviaAlarmaComponent } from './pages/vista-previa-alarma/vista-previa-alarma.component';
import { SeleccionarDuracionNotificacionComponent } from './components/seleccionar-duracion-notificacion/seleccionar-duracion-notificacion.component';
import { SeleccionarFormatoHoraComponent } from './components/seleccionar-formato-hora/seleccionar-formato-hora.component';
import { SeleccionarTipoMarcadorComponent } from './components/seleccionar-tipo-marcador/seleccionar-tipo-marcador.component';
import { SeleccionarTamanioBotonComponent } from './components/seleccionar-tamanio-boton/seleccionar-tamanio-boton.component';

@NgModule({
  declarations: [
    KikirikComponent,
    AgendaComponent,
    AlarmasComponent,
    ConfiguracionComponent,
    SeleccionHoraDialogComponent,
    EditarAlarmaComponent,
    CrearAlarmaComponent,
    VistaPreviaAlarmaComponent,
    SeleccionarDuracionNotificacionComponent,
    SeleccionarFormatoHoraComponent,
    SeleccionarTamanioBotonComponent,
    SeleccionarTipoMarcadorComponent    
  ],
  imports: [
    IonicModule,
    CommonModule,
    KikirikRoutingModule,
    RouterModule,
    SharedModule
  ]
})
export class KikirikModule { }
