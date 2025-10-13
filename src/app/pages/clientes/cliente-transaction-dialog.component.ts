import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-cliente-transaction-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>{{ data.tipo === 'depositar' ? 'Depositar' : 'Sacar' }} - {{ data.cliente.nome }}</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="dialog-form">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Valor</mat-label>
        <input matInput type="number" formControlName="valor" required />
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" (click)="close()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          Confirmar
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      .dialog-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
      }
      .full-width {
        width: 100%;
      }
    `,
  ],
})
export class ClienteTransactionDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClienteTransactionDialogComponent>,
    private clientes: ClientesService
  ) {
    // ✅ Agora inicializa aqui
    this.form = this.fb.group({
      valor: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  onSubmit() {
    const valor = this.form.value.valor!;
    const action =
      this.data.tipo === 'depositar'
        ? this.clientes.depositar(this.data.cliente.id, valor)
        : this.clientes.sacar(this.data.cliente.id, valor);

    action.subscribe(() => this.dialogRef.close(true));
  }

  close() {
    this.dialogRef.close(false);
  }
}
