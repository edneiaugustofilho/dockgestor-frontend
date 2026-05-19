import {DocumentoRequest} from './documento-request.model';

export interface CreateLoteRequest {
  operador: string;
  processo: string;
  documentos: DocumentoRequest[];
}
