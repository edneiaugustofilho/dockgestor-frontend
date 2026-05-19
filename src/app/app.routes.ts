import {Routes} from '@angular/router';
import {LoteListPage} from './feature/lotes/pages/lote-list-page/lote-list-page';
import LoteCreatePage from './feature/lotes/pages/lote-create-page/lote-create-page';

export const routes: Routes = [
  {
    path: '',
    component: LoteListPage
  },
  {
    path: 'lotes',
    component: LoteListPage
  },
  {
    path: 'lotes/novo',
    component: LoteCreatePage
  }
];
