import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Produto } from '../models/produto.model'; // Ajustado para seguir o padrão .model.ts

@Injectable({
  providedIn: 'root'
})
export class CardapioService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/produtos`; // Endpoint centralizado

  // Responsabilidade única: Buscar produtos do banco
  buscaProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }
}