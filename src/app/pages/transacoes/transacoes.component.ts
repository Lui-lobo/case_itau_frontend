import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ClientesService } from '../clientes/clientes.service';

@Component({
  selector: 'app-transacoes',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './transacoes.component.html',
  styleUrl: './transacoes.component.scss',
})
export class TransacoesComponent implements OnInit {
  transacoes: any[] = [];
  loading = false;

  filtroTipo = new FormControl('');
  filtroCliente = new FormControl('');

  displayedColumns = ['id', 'tipo', 'valor', 'data'];

  meta: any = {
    total: 0,
    pagina: 1,
    porPagina: 10,
    saldoAtual: 0,
  };

  constructor(private clientesService: ClientesService) {}

  ngOnInit() {
    this.loadTransacoes();

    this.filtroTipo.valueChanges.subscribe(() => {
      this.meta.pagina = 1;
      this.loadTransacoes();
    });
    this.filtroCliente.valueChanges.subscribe(() => {
      this.meta.pagina = 1;
      this.loadTransacoes();
    });
  }

  loadTransacoes(page: number = this.meta.pagina) {
    this.loading = true;
    this.transacoes = [];

    const tipo = this.filtroTipo.value as 'credito' | 'debito' | '';
    const clienteId = this.filtroCliente.value ? Number(this.filtroCliente.value) : 1;

    this.clientesService.getTransacoes(clienteId, tipo || undefined, page, this.meta.porPagina).subscribe({
      next: (res: any) => {
        this.transacoes = res?.transacoes || [];
        this.meta = {
          clienteId: res?.clienteId,
          total: res?.total,
          pagina: res?.pagina,
          porPagina: res?.porPagina,
          saldoAtual: res?.saldoAtual,
        };
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar transações', err);
        this.loading = false;
      },
    });
  }

  limparFiltros() {
    this.filtroTipo.setValue('');
    this.filtroCliente.setValue('');
    this.meta.pagina = 1;
    this.loadTransacoes();
  }

  // ✅ Funções de paginação
  get totalPaginas() {
    return Math.ceil(this.meta.total / this.meta.porPagina) || 1;
  }

  paginaAnterior() {
    if (this.meta.pagina > 1) {
      this.meta.pagina--;
      this.loadTransacoes();
    }
  }

  proximaPagina() {
    if (this.meta.pagina < this.totalPaginas) {
      this.meta.pagina++;
      this.loadTransacoes();
    }
  }
}
