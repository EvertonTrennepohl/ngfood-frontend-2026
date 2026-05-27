import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Produto } from '../models/produto.model';
import { CardapioService } from './cardapio.service'; // Certifique-se de importar o CardapioService

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.css',
})
export class CardapioComponent implements OnInit {
  // 1. Injetamos o serviço CORRETO isolado para o cardápio
  private cardapioService = inject(CardapioService);

  produtos = signal<Produto[]>([]);
  isCarregando = signal<boolean>(true);
  possuiErro = signal<boolean>(false);

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    // 2. Chamamos a função através do CardapioService
    this.cardapioService.buscaProdutos().subscribe({
      next: (produtosDoBanco) => {
        this.produtos.set(produtosDoBanco);
        this.isCarregando.set(false);
      },
      error: (err) => {
        console.error('Falha ao obter produtos do cardápio:', err);
        this.possuiErro.set(true);
        this.isCarregando.set(false);
      }
    });
  }
}