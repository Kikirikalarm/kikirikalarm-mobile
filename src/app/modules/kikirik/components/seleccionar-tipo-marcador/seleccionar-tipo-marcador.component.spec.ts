import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeleccionarTipoMarcadorComponent } from './seleccionar-tipo-marcador.component';

describe('SeleccionarTipoMarcadorComponent', () => {
  let component: SeleccionarTipoMarcadorComponent;
  let fixture: ComponentFixture<SeleccionarTipoMarcadorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarTipoMarcadorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionarTipoMarcadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
