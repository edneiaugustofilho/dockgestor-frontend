import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import {PageResponse} from '../models/page-response.model';
import {Lote} from '../models/lote.model';
import {LoteStatus} from '../models/lote-status.enum';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  private http = inject(HttpClient);

  private api = 'http://localhost:8180/api/lotes';

  listar(
    status?: LoteStatus,
    page: number = 0,
    size: number = 10
  ): Observable<PageResponse<Lote>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (status) {
      params = params.set(
        'status',
        status
      );
    }

    return this.http.get<PageResponse<Lote>>(
      this.api,
      {params}
    );

  }

}
