import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-cliente-edit-dialog',
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
    <h2 mat-dialog-title>Editar Cliente</h2>

    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="dialog-form">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Nome</mat-label>
        <input matInput formControlName="nome" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required />
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" (click)="close()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          Salvar
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
        width: 100%;
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
export class ClienteEditDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClienteEditDialogComponent>,
    private clientes: ClientesService
  ) {
    this.form = this.fb.group({
      nome: [data.nome, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const updateData = {
      nome: this.form.value.nome!,
      email: this.form.value.email!,
    };

    this.clientes.update(this.data.id, updateData).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Erro ao atualizar cliente', err),
    });
  }

  close() {
    this.dialogRef.close(false);
  }
}
