import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciaPedido } from './gerencia-pedido';

describe('GerenciaPedido', () => {
  let component: GerenciaPedido;
  let fixture: ComponentFixture<GerenciaPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciaPedido],
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciaPedido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
