import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KikirikComponent } from './components/kikirik/kikirik.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { AlarmasComponent } from './pages/alarmas/alarmas.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';

const routes: Routes = [
  {
    path: '',
    component: KikirikComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'alarmas',
      },
      { path: 'alarmas', component: AlarmasComponent },
      { path: 'agenda', component: AgendaComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KikirikRoutingModule { }
