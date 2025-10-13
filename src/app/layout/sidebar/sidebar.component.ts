import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() toggleCollapse = new EventEmitter<void>();
  collapsed = false;

  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Visão Geral', route: '/dashboard' },
    { icon: 'people', label: 'Clientes', route: '/clientes' },
    { icon: 'account_balance_wallet', label: 'Transações', route: '/transacoes' },
  ];

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.toggleCollapse.emit();
  }
}
