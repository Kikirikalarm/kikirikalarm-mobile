import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OptionsConfirm } from '../../models/dialog-confirm-options.model';



@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public confModal: { mensaje: string, options: OptionsConfirm }
  ) {
   }

  ngOnInit(): void {
    if (this.confModal.options.width && this.confModal.options.height) {
      this.dialogRef.updateSize(this.confModal.options.width, this.confModal.options.height);
    }
    this.inicializarVariables()
  }

  inicializarVariables() {
    this.confModal.options.tituloBtnConfirmar = this.confModal.options.tituloBtnConfirmar ? this.confModal.options.tituloBtnConfirmar : 'Confirmar';
    this.confModal.options.tituloBtnCancelar = this.confModal.options.tituloBtnCancelar ? this.confModal.options.tituloBtnCancelar : 'Cancel';
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmo() {
    this.dialogRef.close(true);
  }

}
