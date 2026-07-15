import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventarioService } from '../../services/inventario';
import { ReporteService } from '../../services/reporte';
import {
  IonContent, 
  IonInput, 
  IonItem,
  IonButton, 
  IonSelect, 
  IonSelectOption
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro-insumo',
  templateUrl: './registro-insumo.page.html',
  styleUrls: ['./registro-insumo.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonContent, 
    IonInput, 
    IonItem,
    IonButton, 
    IonSelect,
    IonSelectOption
  ]
})
export class RegistroInsumoPage {

  nombre = '';
  categoria = '';
  cantidad = '';
  unidad = '';
  fecha = new Date().toLocaleDateString('es-PE');
  fechaVencimiento = '';

  // días por categoría
  private diasVencimiento: Record<string, number> = {
    carnes: 7,
    verduras: 7,
    frutas: 7,
    hierbas: 4,
    bebidas: 30,
    granos: 180,
    otros: 15
  };

  constructor(
    private router: Router,
    private inventarioService: InventarioService,
    private reporteService: ReporteService
  ) {}

  // se llama automático al elegir categoría
  calcularVencimiento() {
    const dias = this.diasVencimiento[this.categoria] ?? 15;
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    this.fechaVencimiento = fecha.toLocaleDateString('es-PE');
  }

  async guardarInsumo() {
    await this.inventarioService.guardarInsumo({
      nombre: this.nombre,
      categoria: this.categoria,
      cantidad: Number(this.cantidad),
      unidad: this.unidad,
      fecha: this.fecha,
      fechaVencimiento: this.fechaVencimiento
    });

    await this.reporteService.registrarActividad(
      'Registró insumo',
      `Insumo: ${this.nombre} 
      | Cantidad: ${this.cantidad} ${this.unidad} 
      | Categoría: ${this.categoria} 
      | Vence: ${this.fechaVencimiento}`
    );

    this.router.navigate(['/registro-exitoso']);
  }

  cancelar() {
    this.router.navigate(['/home']);
  }
}