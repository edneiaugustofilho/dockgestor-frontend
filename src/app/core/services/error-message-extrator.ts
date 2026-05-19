import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiErrorResponse} from '../models/api-error-response.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageExtractorService {

  public extract(error: unknown, defaultMessage: string = 'Ocorreu um erro inesperado.'): string {
    if (error instanceof HttpErrorResponse) {
      const apiError = error.error as ApiErrorResponse | undefined;

      if (apiError?.messages?.length) {
        return apiError.messages.join(', ');
      }
    }

    return defaultMessage;
  }

}
