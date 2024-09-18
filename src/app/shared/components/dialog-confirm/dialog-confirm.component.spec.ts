import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogConfirmComponent } from './dialog-confirm.component';

const data = {
  mensaje: 'test message', options: {
    isSvgIcon: true,
    tituloBtnConfirmar: 'tituloBtnConfirmar',
    tituloBtnCancelar: 'tituloBtnCancelar',
    verBtnCancelar: true,
    verBtnConfirmar: true,
    width: '100px',
    height: '100px'
  }
}

const matDialogSpy = jasmine.createSpyObj('MatDialogRef', ['closeDialog', 'updateSize', 'close']);

describe('DialogConfirmComponent', () => {
  let component: DialogConfirmComponent;
  let fixture: ComponentFixture<DialogConfirmComponent>;
  let dialogRefMock: MatDialogRef<DialogConfirmComponent>;
  let confModalMock: { mensaje: string, options: any };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirmComponent],
      providers: [
        { provide: MatDialogRef, useValue: matDialogSpy },
        {
          provide: MAT_DIALOG_DATA, useValue: data,
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmComponent);
    dialogRefMock = TestBed.inject(MatDialogRef);
    confModalMock = TestBed.inject(MAT_DIALOG_DATA);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create DialogConfirmComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables with default values if options are not provided', () => {
    const confModal = { mensaje: 'test message', options: {} };
    component.confModal = confModal;
    component.inicializarVariables();
    expect(component.confModal.options.isSvgIcon).toBe(false);
    expect(component.confModal.options.tituloBtnConfirmar).toBe('Confirmar');
    expect(component.confModal.options.tituloBtnCancelar).toBe('Cancel');
    expect(component.confModal.options.verBtnCancelar).toBe(true);
    expect(component.confModal.options.verBtnConfirmar).toBe(true);
  });


  it('should close dialog when cancel button is clicked', () => {
    component.onNoClick();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });

  it('should close dialog with true value when confirm button is clicked', () => {
    component.confirmo();
    expect(component.dialogRef.close).toHaveBeenCalledWith(true);
  });

});
