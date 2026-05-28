import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Produto } from '../models/produto.model';
import { PedidoService } from '../pedido/pedido.service';
import { CardapioService } from './cardapio.service';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.css',
  imports: [
    RouterLink,
    UpperCasePipe,
    DecimalPipe,
    MatToolbarModule,    // Libera <mat-toolbar> e <mat-toolbar-row>
    MatIconModule,       // Libera <mat-icon>
    MatBadgeModule,      // Libera [matBadge]
    MatListModule,       // Libera <mat-action-list> e <h2 matSubheader>
    MatButtonModule      // Libera mat-button
  ]
})
export class CardapioComponent implements OnInit {
  // 1. Injetamos o serviço CORRETO isolado para o cardápio
  private cardapioService = inject(CardapioService);

  // 2. Injetamos o serviço pedidoService
  public pedidoService = inject(PedidoService);

  produtos = signal<Produto[]>([]);
  isCarregando = signal<boolean>(true);
  possuiErro = signal<boolean>(false);

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    // 3. Chamamos a função através do CardapioService
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