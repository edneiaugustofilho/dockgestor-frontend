import {Documento} from './documento.model';
import {LoteStatus} from './lote-status.enum';

export interface Lote {

  id: number;
  operador: string;
  processo: string;
  status: LoteStatus;
  dataCriacao: string;

  documentos: Documento[];

}
