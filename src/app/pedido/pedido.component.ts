import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PedidoService } from './pedido.service';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css' // Adicionado arquivo de estilo conforme convenção
})
export class PedidoComponent {
  // Injeção de dependências moderna (dispensa o constructor)
  // Mantido como 'public' caso o seu HTML acesse propriedades diretas do serviço (ex: lista do carrinho)
  public pedidoService = inject(PedidoService);
  private router = inject(Router);

  realizaPedido(): void {
    // 1. Dispara a requisição para a sua API do Spring Boot na Render
    this.pedidoService.realizaPedido().subscribe({
      next: (pedidoCriado: any) => {
        // 2. Só limpa o carrinho local APÓS o servidor confirmar a gravação no Supabase
        this.pedidoService.limpaPedido();

        // 3. Redireciona para a tela de pedido realizado passando o ID retornado pelo banco
        this.router.navigate(['/pedido', pedidoCriado.id]);
      },
      error: (err) => {
        console.error('Falha ao registrar o pedido na API:', err);
        alert('Não foi possível fechar o seu pedido. Tente novamente.');
      }
    });
  }
}