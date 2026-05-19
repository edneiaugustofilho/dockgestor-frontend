import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {CreateLoteRequest} from '../../models/create-lote-request.model';
import {DocumentoRequest} from '../../models/documento-request.model';

@Component({
  selector: 'app-lote-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './lote-create-dialog.html',
  styleUrl: './lote-create-dialog.css'
})
export class LoteCreateDialog {

  private dialogRef = inject(MatDialogRef<LoteCreateDialog>);

  operador = '';
  processo = '';

  documentos: DocumentoRequest[] = [
    {
      tipo: '',
      nome: ''
    }
  ];

  adicionarDocumento(): void {
    this.documentos.push({
      tipo: '',
      nome: ''
    });
  }

  removerDocumento(index: number): void {
    if (this.documentos.length === 1) {
      return;
    }

    this.documentos.splice(index, 1);
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    const request: CreateLoteRequest = {
      operador: this.operador,
      processo: this.processo,
      documentos: this.documentos
    };

    this.dialogRef.close(request);
  }
}
