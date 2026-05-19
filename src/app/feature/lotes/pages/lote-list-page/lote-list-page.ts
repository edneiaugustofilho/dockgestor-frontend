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
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {SnackBarService} from '../../../../core/services/snack-bar';

@Component({
  selector: 'app-lote-list-page',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ], templateUrl: './lote-list-page.html',
  styleUrl: './lote-list-page.css'
})
export class LoteListPage {

  protected readonly LoteStatus = LoteStatus;

  private dialog = inject(MatDialog);
  private snackBarService = inject(SnackBarService);
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

  ngOnInit(): void {
    this.carregar();
  }

  filtrar(): void {
    this.carregar();
  }

  carregar(): void {
    this.loading.set(true);

    this.loteService.listar(this.statusSelecionado() ?? undefined)
      .subscribe({
        next: response => {
          this.lotes.set(response.content);
          this.loading.set(false);
        },
        error: (err) => {
          this.showSnackBar(this.extractErrorMessage(err, 'Não foi possível carregar os lotes.'));
          this.loading.set(false);
        }
      });
  }

  abrirAtualizacaoStatus(lote: Lote): void {
    const dialogRef = this.dialog.open(StatusUpdateDialog, {
      data: lote
    });

    dialogRef.afterClosed().subscribe((novoStatus: LoteStatus | undefined) => {
      if (!novoStatus || novoStatus === lote.status) {
        return;
      }

      this.loteService.atualizarStatus(lote.id, novoStatus)
        .subscribe({
          next: () => {
            this.showSnackBar('Status do lote atualizado com sucesso.');
            this.carregar();
          },
          error: (err) => {
            this.showSnackBar(this.extractErrorMessage(err, 'Não foi possível atualizar o statos do lote.'));
          }
        });
    });
  }

  private extractErrorMessage(error: unknown, defaultMessage: string | null): string {
    return defaultMessage == null ?
      this.errorMessageExtractor.extract(error) :
      this.errorMessageExtractor.extract(error, defaultMessage);
  }

  private showSnackBar(message: string): void {
    this.snackBarService.showMessage(message)
  }
}
