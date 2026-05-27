import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Caminho relativo atualizado
import { Pedido } from '../models/pedido.model'; // Nome e caminho atualizados do modelo
import { Produto } from '../models/produto.model'; // Caminho atualizado do modelo

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  // Injeção moderna do HttpClient (dispensa o constructor)
  private http = inject(HttpClient);

  // Array que gerencia os itens no carrinho de compras local
  itens: { produto: Produto, quantidade: number }[] = [];

  adicionaProduto(produto: Produto): void {
    // Busca se o produto já existe no carrinho usando o ID único (melhor prática que usar a descrição)
    let item = this.itens.find(i => i.produto.id === produto.id);
    
    if (item) {
      item.quantidade++;
    } else {
      this.itens.push({ produto, quantidade: 1 });
    }
  }

  limpaPedido(): void {
    this.itens = [];
  }

  // 💡 O método buscaProdutos() FOI REMOVIDO daqui pois agora pertence ao CardapioService

  realizaPedido(): Observable<Pedido> {
    return this.http.post<Pedido>(`${apiUrl}/pedido`, {
      itens: this.itens
    });
  }

  carregaPedido(idPedido: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${apiUrl}/pedido/${idPedido}`);
  }

  carregaTodosPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${apiUrl}/pedidos/`);
  }

  atualizaSituacaoPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${apiUrl}/pedido/${pedido.id}`, pedido);
  }

  // Sintaxe moderna usando .reduce() para somar valores de forma limpa
  get valorTotal(): number {
    return this.itens.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);
  }

  get quantidadeTotal(): number {
    return this.itens.reduce((total, item) => total + item.quantidade, 0);
  }
}