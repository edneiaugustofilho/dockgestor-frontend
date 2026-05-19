import {Component, inject, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoteService} from '../../services/lote';
import {Lote} from '../../models/lote.model';
import {LoteStatus} from '../../models/lote-status.enum';

@Component({
  selector: 'app-lote-list-page',
  imports: [
    CommonModule
  ],
  templateUrl: './lote-list-page.html',
  styleUrl: './lote-list-page.css'
})
export class LoteListPage {

  private loteService = inject(LoteService);

  lotes = signal<Lote[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  carregar(): void {
    this.loading.set(true);
    this.error.set(null);

    this.loteService.listar()
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
