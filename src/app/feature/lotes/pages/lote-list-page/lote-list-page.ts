import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {LoteService} from '../../services/lote';
import {Lote} from '../../models/lote.model';
import {LoteStatus} from '../../models/lote-status.enum';

@Component({
  selector: 'app-lote-list-page',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],  templateUrl: './lote-list-page.html',
  styleUrl: './lote-list-page.css'
})
export class LoteListPage {

  statusSelecionado = signal<LoteStatus | null>(null);

  statusOptions = [
    {label: 'Todos', value: null},
    {label: 'Pendente', value: LoteStatus.PENDENTE},
    {label: 'Exportado', value: LoteStatus.EXPORTADO},
    {label: 'Rejeitado', value: LoteStatus.REJEITADO}
  ];

  private loteService = inject(LoteService);

  lotes = signal<Lote[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

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
        error: (err ) => {
          console.error(err);
          this.error.set('Não foi possível carregar os lotes.');
          this.loading.set(false);
        }
      });
  }

  ngOnInit(): void {
    this.carregar();
  }

  protected readonly LoteStatus = LoteStatus;
}
