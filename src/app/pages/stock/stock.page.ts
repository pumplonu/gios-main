import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventarioService, Insumo } from '../../services/inventario';
import { ReporteService } from '../../services/reporte';
import {
  IonContent, IonItem, IonInput, IonButton, IonCard,
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
  IonCardContent, AlertController
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.page.html',
  styleUrls: ['./stock.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonItem, IonInput, IonButton, IonCard,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
    IonCardContent
  ]
})
export class StockPage {
  busqueda = '';
  insumos: Insumo[] = [];

  constructor(
    private inventarioService: InventarioService,
    private alertController: AlertController,
    private reporteService: ReporteService
  ) {}

  ionViewWillEnter() {
    this.cargarInsumos();
  }

  cargarInsumos() {
    this.insumos = this.inventarioService.obtenerInsumos();
  }

  async confirmarEliminar(id: number, nombre: string) {
    const alert = await this.alertController.create({
      header: '¿Eliminar insumo?',
      message: `¿Estás seguro de eliminar "${nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.inventarioService.eliminarInsumo(id);
            this.reporteService.registrarActividad(
            'Eliminó insumo',
            `Insumo: ${nombre}`);
            this.cargarInsumos();
          }
        }
      ]
    });
    await alert.present();
  }

  async editarInsumo(item: Insumo) {
    const alert = await this.alertController.create({
      header: 'Editar Insumo',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre',
          value: item.nombre
        },
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Cantidad',
          value: item.cantidad
        },
        {
          name: 'unidad',
          type: 'text',
          placeholder: 'Unidad',
          value: item.unidad
        },
        {
          name: 'categoria',
          type: 'text',
          placeholder: 'Categoría',
          value: item.categoria
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Guardar',
          handler: (data) => {
            this.inventarioService.actualizarInsumo({
              ...item,
              nombre: data.nombre,
              cantidad: Number(data.cantidad),
              unidad: data.unidad,
              categoria: data.categoria
            });
            this.reporteService.registrarActividad(
            'Editó insumo',
            `Insumo: ${data.nombre} | Cantidad: ${data.cantidad} ${data.unidad}`);
            this.cargarInsumos();
          }
        }
      ]
    });
    await alert.present();
  }

  obtenerEstado(cantidad: number) {
    if (cantidad <= 10) return 'Crítico';
    if (cantidad <= 25) return 'Bajo';
    return 'Normal';
  }

  obtenerClaseEstado(cantidad: number) {
    if (cantidad <= 10) return 'estado-critico';
    if (cantidad <= 25) return 'estado-bajo';
    return 'estado-normal';
  }

  obtenerIcono(categoria: string) {
    switch (categoria.toLowerCase()) {
      case 'verduras': return '🥬';
      case 'carnes': return '🍗';
      case 'bebidas': return '🥤';
      default: return '📦';
    }
  }
}