import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import {LoteService} from '../../services/lote';
import {SnackBarService} from '../../../../core/services/snack-bar';
import {ErrorMessageExtractorService} from '../../../../core/services/error-message-extrator';
import {DocumentoRequest} from '../../models/documento-request.model';
import {CreateLoteRequest} from '../../models/create-lote-request.model';

@Component({
  selector: 'app-lote-create-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './lote-create-page.html',
  styleUrl: './lote-create-page.css'
})
class LoteCreatePage {

  private loteService = inject(LoteService);
  private router = inject(Router);
  private snackBarService = inject(SnackBarService);
  private errorExtractor = inject(ErrorMessageExtractorService);

  operador = '';
  processo = '';

  documentos: DocumentoRequest[] = [
    { tipo: '', nome: '' }
  ];

  saving = false;

  adicionarDocumento(): void {
    this.documentos.push({ tipo: '', nome: '' });
  }

  removerDocumento(index: number): void {
    if (this.documentos.length === 1) {
      return;
    }

    this.documentos.splice(index, 1);
  }

  salvar(): void {
    this.saving = true;

    const request: CreateLoteRequest = {
      operador: this.operador,
      processo: this.processo,
      documentos: this.documentos
    };

    this.loteService.criar(request).subscribe({
      next: () => {
        this.snackBarService.showMessage('Lote criado com sucesso.');
        this.router.navigate(['/']).then();
      },
      error: error => {
        this.saving = false;
        this.snackBarService.showMessage(
          this.errorExtractor.extract(
            error,
            'Não foi possível criar o lote.'
          )
        );
      }
    });
  }
}

export default LoteCreatePage
