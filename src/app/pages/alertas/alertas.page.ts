import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButtons, 
  IonBackButton, 
  IonCard, 
  IonCardContent
} from '@ionic/angular/standalone';
import { InventarioService, Insumo } from '../../services/inventario';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.page.html',
  styleUrls: ['./alertas.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonCard, IonCardContent
  ]
})
export class AlertasPage implements OnInit {
  insumosCriticos: Insumo[] = [];
  insumosPorVencer: Insumo[] = [];


  constructor(private inventarioService: InventarioService) {}

  ngOnInit() {
    this.cargarAlertas();
  }

  ionViewWillEnter() {
    this.cargarAlertas();
  }

  async cargarAlertas() {
  const todos = await this.inventarioService.obtenerInsumos();

  // stock crítico según unidad
  this.insumosCriticos = todos.filter(item => {
    if (item.unidad === 'kg') return item.cantidad <= 8;
    if (item.unidad === 'litros') return item.cantidad <= 15;
    if (item.unidad === 'unidades') return item.cantidad <= 20;
    return item.cantidad <= 15; 
  });

  // por vencer: menos de 7 días
  const hoy = new Date();
  this.insumosPorVencer = todos.filter(item => {
    if (!item.fechaVencimiento) return false;
    const partes = item.fechaVencimiento.split('/');
    const fechaVence = new Date(
      Number(partes[2]),
      Number(partes[1]) - 1,
      Number(partes[0])
    );
    const dias = Math.ceil(
      (fechaVence.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
    );
    return dias >= 0 && dias <= 7;
  });  
  }
diasParaVencer(fechaVencimiento: string): number {
  const partes = fechaVencimiento.split('/');
  const fechaVence = new Date(
    Number(partes[2]),
    Number(partes[1]) - 1,
    Number(partes[0])
  );
  const hoy = new Date();
  return Math.ceil(
    (fechaVence.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)
  );
}

}
