import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { MainLayoutComponent } from './layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ClientesListComponent } from './pages/clientes/clientes-list.component';
import { ClienteDetailComponent } from './pages/clientes/cliente-detail.component';
import { TransacoesComponent } from './pages/transacoes/transacoes.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'clientes', component: ClientesListComponent, canActivate: [AuthGuard] },
      { path: 'clientes/:id', component: ClienteDetailComponent, canActivate: [AuthGuard] },
      { path: 'transacoes', component: TransacoesComponent, canActivate: [AuthGuard] }, // ✅ nova rota
    ],
  },
];
