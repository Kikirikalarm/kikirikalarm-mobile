import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../components/dialog-confirm/dialog-confirm.component';
import { OptionsConfirm } from '../models/dialog-confirm-options.model';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmServiceService {

  constructor(
    private matDialog: MatDialog,
  ) { }

  private confirmDialogRef: MatDialogRef<DialogConfirmComponent> | null = null;

  /**
  *
  * @param confModal Configuracion del modal
  */
  succesConfirmMessaje(mensaje: string, options: OptionsConfirm = {}) {
    return new Promise((resolve, reject) => {
      this.confirmDialogRef = this.matDialog.open(DialogConfirmComponent, {
        data: { mensaje, options },
        panelClass: '',
        autoFocus: false,
      });
      this.confirmDialogRef.afterClosed().subscribe(result => {
        if (result) {
          resolve(true)
        } else {
          resolve(false);
        }
        this.confirmDialogRef = null;
      })
    })
  }
}
