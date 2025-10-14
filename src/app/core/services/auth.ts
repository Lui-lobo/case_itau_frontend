import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface User {
  id: number;
  nome: string;
  email: string;
  clientId: number;
  clientName: string;
}

interface LoginResponse {
  accessToken: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth'; // ajuste conforme seu backend

  constructor(private http: HttpClient) {}

  // ✅ Registro de novo usuário (auth/register)
  register(nome: string, email: string, senha: string, clientId: Number): Observable<any> {
    const headers = new HttpHeaders({
      'x-client-id': 'default-client',
      'x-client-secret': 'default-secret-key',
    });

    const stringSenha = String(senha);
    const data = { nome, email, password: stringSenha, clientId };

    return this.http.post(`${this.baseUrl}/register`, data, { headers });
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((res) => {
        if (res.accessToken) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('user', JSON.stringify(res.user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  }
}
