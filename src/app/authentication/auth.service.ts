import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cliente } from '../models/cliente.model';

const apiUrl = environment.apiUrl;
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Injeção moderna recomendada do HttpClient (dispensa o constructor)
  private http = inject(HttpClient);

  login(credenciais: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${apiUrl}/login`, credenciais, { observe: 'response' });
  }

  // Tipagem forte de Cliente para o cadastro completo
  register(cliente: Cliente): Observable<any> {
    return this.http.post(`${apiUrl}/registro`, cliente, httpOptions);
  }

    // Método para obter o token que salvamos no sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('auth-token');
  }

  // Método que decodifica o JWT e retorna os dados do usuário (Payload)
  getUsuarioLogado(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      // O token costuma vir como "Bearer eyJ0eX...", precisamos remover o "Bearer "
      const tokenPuro = token.replace('Bearer ', '').trim();
      
      // Divide o token pelos pontos e captura a segunda parte (índice 1 = Payload)
      const payloadBase64 = tokenPuro.split('.')[1];
      
      // Decodifica a string Base64 nativamente no navegador
      const payloadDecodificado = window.atob(payloadBase64);
      
      // Converte o texto JSON em um objeto JavaScript utilizável
      return JSON.parse(payloadDecodificado);
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }
}
