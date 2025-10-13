import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Headers padrão exigidos pelo backend
  const headers: Record<string, string> = {
    'x-client-id': 'default-client',
    'x-client-secret': 'default-secret-key',
  };

  // Adiciona token se existir
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const clonedReq = req.clone({
    setHeaders: headers,
  });

  return next(clonedReq);
};
