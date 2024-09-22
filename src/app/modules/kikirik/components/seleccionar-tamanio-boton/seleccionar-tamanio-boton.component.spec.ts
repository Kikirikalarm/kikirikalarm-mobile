import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeleccionarTamanioBotonComponent } from './seleccionar-tamanio-boton.component';

describe('SeleccionarTamanioBotonComponent', () => {
  let component: SeleccionarTamanioBotonComponent;
  let fixture: ComponentFixture<SeleccionarTamanioBotonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarTamanioBotonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionarTamanioBotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
