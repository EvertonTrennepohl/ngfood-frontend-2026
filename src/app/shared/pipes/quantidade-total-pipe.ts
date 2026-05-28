import { Pipe, PipeTransform } from '@angular/core';
import { ItemPedido } from '../../models/pedido.model'; // Ajuste o caminho até o seu arquivo/modelo de pedido se necessário

@Pipe({
  name: 'quantidadeTotal',
  standalone: true // <-- ESSA LINHA É OBRIGATÓRIA NO ANGULAR 21
})
export class QuantidadeTotalPipe implements PipeTransform {

  transform(itens: ItemPedido[]): number {
    if (!itens || itens.length === 0) {
      return 0;
    }

    let quantidade = 0;
    for (const item of itens) {
      quantidade += item.quantidade;
    }
    return quantidade;
  }

}