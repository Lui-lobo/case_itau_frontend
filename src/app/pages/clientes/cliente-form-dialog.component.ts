import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-cliente-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>Novo Cliente</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="dialog-form">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Nome</mat-label>
        <input matInput formControlName="nome" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Senha</mat-label>
        <input matInput type="password" formControlName="senha" required />
      </mat-form-field>

      <div class="actions">
        <button mat-button type="button" (click)="close()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Salvar</button>
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
export class ClienteFormDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClienteFormDialogComponent>,
    private clientes: ClientesService
  ) {
    // ✅ Agora inicializa aqui, após o Angular injetar o fb
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const formData = {
      nome: this.form.value.nome!,
      email: this.form.value.email!,
      senha: this.form.value.senha!,
    };

    this.clientes.create(formData).subscribe(() => this.dialogRef.close(true));
  }

  close() {
    this.dialogRef.close(false);
  }
}
