import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoteService} from '../../services/lote';
import {Lote} from '../../models/lote.model';
import {LoteStatus} from '../../models/lote-status.enum';
import {StatusUpdateDialog} from '../../components/status-update-dialog/status-update-dialog';
import {ErrorMessageExtractorService} from '../../../../core/services/error-message-extrator';

@Component({
  selector: 'app-lote-list-page',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ], templateUrl: './lote-list-page.html',
  styleUrl: './lote-list-page.css'
})
export class LoteListPage {

  protected readonly LoteStatus = LoteStatus;

  private dialog = inject(MatDialog);
  private loteService = inject(LoteService);
  private errorMessageExtractor = inject(ErrorMessageExtractorService);

  statusOptions = [
    {label: 'Todos', value: null},
    {label: 'Pendente', value: LoteStatus.PENDENTE},
    {label: 'Exportado', value: LoteStatus.EXPORTADO},
    {label: 'Rejeitado', value: LoteStatus.REJEITADO}
  ];

  statusSelecionado = signal<LoteStatus | null>(null);
  lotes = signal<Lote[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.carregar();
  }

  filtrar(): void {
    this.carregar();
  }

  carregar(): void {
    this.loading.set(true);
    this.error.set(null);

    this.loteService.listar(this.statusSelecionado() ?? undefined)
      .subscribe({
        next: response => {
          this.lotes.set(response.content);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.error.set(this.extractErrorMessage(err, 'Não foi possível carregar os lotes.'));
          this.loading.set(false);
        }
      });
  }

  abrirAtualizacaoStatus(lote: Lote): void {
    this.error.set(null);

    const dialogRef = this.dialog.open(StatusUpdateDialog, {
      data: lote
    });

    dialogRef.afterClosed().subscribe((novoStatus: LoteStatus | undefined) => {
      if (!novoStatus || novoStatus === lote.status) {
        return;
      }

      this.loteService.atualizarStatus(lote.id, novoStatus)
        .subscribe({
          next: () => this.carregar(),
          error: () => this.error.set('Não foi possível atualizar o status do lote.')
        });
    });
  }

  private extractErrorMessage(error: unknown, defaultMessage: string | null): string {
    return defaultMessage == null ?
      this.errorMessageExtractor.extract(error) :
      this.errorMessageExtractor.extract(error, defaultMessage);
  }
}
