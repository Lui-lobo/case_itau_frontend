import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();
  if (token) {
    return true; // ✅ pode acessar
  }

  // 🚫 sem token → redireciona para login
  router.navigateByUrl('/login');
  return false;
};
