import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeleccionarDuracionNotificacionComponent } from './seleccionar-duracion-notificacion.component';

describe('SeleccionarDuracionNotificacionComponent', () => {
  let component: SeleccionarDuracionNotificacionComponent;
  let fixture: ComponentFixture<SeleccionarDuracionNotificacionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarDuracionNotificacionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionarDuracionNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
