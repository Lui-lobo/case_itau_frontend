import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientesService, Cliente } from './clientes.service';
import { ClienteFormDialogComponent } from './cliente-form-dialog.component';
import { ClienteTransactionDialogComponent } from './cliente-transaction-dialog.component';
import { ClienteEditDialogComponent } from './cliente-edit-dialog.component';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.scss',
})
export class ClientesListComponent implements OnInit {
  displayedColumns = ['id', 'nome', 'email', 'saldo', 'actions'];
  clientes: Cliente[] = [];
  loading = false;

  constructor(private clientesService: ClientesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.loading = true;
    this.clientesService.list().subscribe({
      next: (data) => {
        this.clientes = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar clientes', err);
        this.loading = false;
      },
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ClienteFormDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadClientes();
    });
  }

  openEditDialog(cliente: Cliente) {
    const dialogRef = this.dialog.open(ClienteEditDialogComponent, {
      width: '400px',
      data: cliente,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadClientes();
    });
  }

  openTransactionDialog(cliente: Cliente, tipo: 'depositar' | 'sacar') {
    const dialogRef = this.dialog.open(ClienteTransactionDialogComponent, {
      width: '400px',
      data: { cliente, tipo },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadClientes();
    });
  }

  desativar(cliente: Cliente) {
    if (confirm(`Deseja realmente desativar o cliente ${cliente.nome}?`)) {
      this.clientesService.desativar(cliente.id).subscribe(() => this.loadClientes());
    }
  }
}
