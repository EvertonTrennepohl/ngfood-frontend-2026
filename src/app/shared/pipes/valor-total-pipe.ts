import { Pipe, PipeTransform } from '@angular/core';
import { ItemPedido } from '../../models/pedido.model';

@Pipe({
  name: 'valorTotal',
  standalone: true // <-- ESSA LINHA É OBRIGATÓRIA NO ANGULAR 21
})
export class ValorTotalPipe implements PipeTransform {

  // Atualizado o retorno de 'unknown' para 'number' para melhor prática do TypeScript
  transform(itens: ItemPedido[]): number {
    if (!itens || itens.length === 0) {
      return 0;
    }
    
    let valor = 0;
    for (const item of itens) {
      valor += item.produto.preco * item.quantidade;
    }
    return valor;
  }

}