import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService, Cliente } from './clientes.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cliente-detail.component.html',
  styleUrl: './cliente-detail.component.scss',
})
export class ClienteDetailComponent implements OnInit {
  cliente: Cliente | null = null;
  transacoes: any[] = [];
  loading = true;
  filtroTipo = new FormControl('');

  displayedColumns = ['data', 'tipo', 'valor', 'descricao'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientesService: ClientesService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/clientes']);
      return;
    }

    this.loadCliente(id);
    this.loadTransacoes(id);

    this.filtroTipo.valueChanges.subscribe((tipo) => {
      this.loadTransacoes(id, tipo as 'credito' | 'debito' | '');
    });
  }

  loadCliente(id: number) {
    this.loading = true;
    this.clientesService.getById(id).subscribe({
      next: (c) => {
        this.cliente = c;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  loadTransacoes(id: number, tipo?: 'credito' | 'debito' | '') {
    this.clientesService.getTransacoes(id, tipo || undefined).subscribe({
      next: (res: any) => {
        this.transacoes = res || [];
      },
      error: (err) => {
        console.error('Erro ao buscar transações', err);
      },
    });
  }

  voltar() {
    this.router.navigate(['/clientes']);
  }
}
