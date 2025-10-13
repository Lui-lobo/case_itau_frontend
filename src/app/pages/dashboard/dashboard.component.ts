import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  user: any;
  cards = [
    { icon: 'account_balance', title: 'Conta Corrente', description: 'Saldo e movimentações' },
    { icon: 'credit_card', title: 'Cartões', description: 'Gerencie seus cartões' },
    { icon: 'payments', title: 'Pagamentos', description: 'Boletos e transferências' },
    { icon: 'trending_up', title: 'Investimentos', description: 'Rendimentos e aplicações' },
  ];

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.user = this.auth.getCurrentUser();
  }
}
