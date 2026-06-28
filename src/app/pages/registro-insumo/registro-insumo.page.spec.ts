import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroInsumoPage } from './registro-insumo.page';

describe('RegistroInsumoPage', () => {
  let component: RegistroInsumoPage;
  let fixture: ComponentFixture<RegistroInsumoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroInsumoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
