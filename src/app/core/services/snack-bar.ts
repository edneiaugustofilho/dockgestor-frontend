import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private snackBar = inject(MatSnackBar);

  public showMessage(message: string): void {
    this.snackBar.open(
      message,
      'Fechar',
      {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    );
  }

}
