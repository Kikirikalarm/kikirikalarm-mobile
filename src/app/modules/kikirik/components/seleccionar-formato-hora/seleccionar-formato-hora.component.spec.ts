import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SeleccionarFormatoHoraComponent } from './seleccionar-formato-hora.component';

describe('SeleccionarFormatoHoraComponent', () => {
  let component: SeleccionarFormatoHoraComponent;
  let fixture: ComponentFixture<SeleccionarFormatoHoraComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarFormatoHoraComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SeleccionarFormatoHoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
