import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LitaPedidos } from './lita-pedidos';

describe('LitaPedidos', () => {
  let component: LitaPedidos;
  let fixture: ComponentFixture<LitaPedidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LitaPedidos],
    }).compileComponents();

    fixture = TestBed.createComponent(LitaPedidos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
