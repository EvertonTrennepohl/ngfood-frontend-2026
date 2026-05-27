import { Produto } from './produto.model'; // Caminho ajustado para a mesma pasta

export interface Pedido {
  id: number;
  dataHora: string;
  situacao: string;
  itens: ItemPedido[];
}

export interface ItemPedido {
  produto: Produto;
  quantidade: number;
}