import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectorDiasConcurrentesComponent } from './selector-dias-concurrentes.component';

describe('SelectorDiasConcurrentesComponent', () => {
  let component: SelectorDiasConcurrentesComponent;
  let fixture: ComponentFixture<SelectorDiasConcurrentesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorDiasConcurrentesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorDiasConcurrentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
