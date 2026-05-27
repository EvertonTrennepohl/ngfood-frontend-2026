import { Routes } from '@angular/router';
import { authGuard } from './authentication/auth.guard';
import { CardapioComponent } from './cardapio/cardapio.component';
import { GerenciaPedido } from './gerencia-pedido/gerencia-pedido';
import { ListaPedidos } from './lista-pedidos/lista-pedidos';
import { LoginComponent } from './login/login.component';
import { PedidoRealizado } from './pedido-realizado/pedido-realizado';
import { PedidoComponent } from './pedido/pedido.component';

export const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "cardapio", component: CardapioComponent, canActivate: [authGuard] },
  { path: "pedido", component: PedidoComponent, canActivate: [authGuard] },
  { path: "pedido/:idPedido", component: PedidoRealizado, canActivate: [authGuard] },
  { path: "pedidos", component: ListaPedidos, canActivate: [authGuard] },
  { path: "pedidos/:idPedido/editar", component: GerenciaPedido, canActivate: [authGuard] },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "login" }
];
