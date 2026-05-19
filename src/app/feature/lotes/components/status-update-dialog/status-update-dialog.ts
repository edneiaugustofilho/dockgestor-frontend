import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';

import {Lote} from '../../models/lote.model';
import {LoteStatus} from '../../models/lote-status.enum';

@Component({
  selector: 'app-status-update-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './status-update-dialog.html',
  styleUrl: './status-update-dialog.css'
})
export class StatusUpdateDialog {

  private dialogRef = inject(MatDialogRef<StatusUpdateDialog>);
  lote = inject<Lote>(MAT_DIALOG_DATA);

  statusSelecionado: LoteStatus = this.lote.status;

  statusOptions = [
    LoteStatus.PENDENTE,
    LoteStatus.EXPORTADO,
    LoteStatus.REJEITADO
  ];

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    this.dialogRef.close(this.statusSelecionado);
  }
}
