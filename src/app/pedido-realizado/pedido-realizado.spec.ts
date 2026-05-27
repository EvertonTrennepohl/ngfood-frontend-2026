import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoRealizado } from './pedido-realizado';

describe('PedidoRealizado', () => {
  let component: PedidoRealizado;
  let fixture: ComponentFixture<PedidoRealizado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidoRealizado],
    }).compileComponents();

    fixture = TestBed.createComponent(PedidoRealizado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
