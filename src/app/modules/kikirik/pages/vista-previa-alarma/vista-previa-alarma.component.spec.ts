import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VistaPreviaAlarmaComponent } from './vista-previa-alarma.component';

describe('VistaPreviaAlarmaComponent', () => {
  let component: VistaPreviaAlarmaComponent;
  let fixture: ComponentFixture<VistaPreviaAlarmaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPreviaAlarmaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VistaPreviaAlarmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
