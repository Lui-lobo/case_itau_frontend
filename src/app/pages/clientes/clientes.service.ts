import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  saldo: number;
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class ClientesService {
  private baseUrl = 'http://localhost:8080/api/v1/clientes';

  constructor(private http: HttpClient) {}

  list(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  create(data: { nome: string; email: string; senha: string }): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, data);
  }

  update(id: number, data: Partial<Cliente>): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/${id}`, data);
  }

  depositar(id: number, valor: number) {
    return this.http.post(`${this.baseUrl}/${id}/depositar`, { valor });
  }

  sacar(id: number, valor: number) {
    return this.http.post(`${this.baseUrl}/${id}/sacar`, { valor });
  }

  desativar(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getTransacoes(id: number, tipo?: 'credito' | 'debito', page = 1, limit = 10) {
    let params: any = { page, limit };
    if (tipo) params.tipo = tipo;
    return this.http.get(`${this.baseUrl}/${id}/transacoes`, { params });
  }
}
