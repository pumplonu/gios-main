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

  async cargarInsumos() {
  this.insumos = await this.inventarioService.obtenerInsumos();
}

async confirmarEliminar(id: string, nombre: string) { // id: string ya no number
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
          this.inventarioService.eliminarInsumo(id).then(() => {
            this.reporteService.registrarActividad(
              'Eliminó insumo',
              `Insumo: ${nombre}`
            );
            this.cargarInsumos();
          });
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
      { name: 'nombre', type: 'text', placeholder: 'Nombre', value: item.nombre },
      { name: 'cantidad', type: 'number', placeholder: 'Cantidad', value: item.cantidad },
      { name: 'unidad', type: 'text', placeholder: 'Unidad', value: item.unidad },
      { name: 'categoria', type: 'text', placeholder: 'Categoría', value: item.categoria }
    ],
    buttons: [
      { text: 'Cancelar', role: 'cancel' },
      {
        text: 'Guardar',
        handler: (data) => {
          this.inventarioService.actualizarInsumo({
            ...item,
            nombre: data.nombre,
            cantidad: Number(data.cantidad),
            unidad: data.unidad,
            categoria: data.categoria
          }).then(() => {
            this.reporteService.registrarActividad(
              'Editó insumo',
              `Insumo: ${data.nombre} | Cantidad: ${data.cantidad} ${data.unidad}`
            );
            this.cargarInsumos();
          });
        }
      }
    ]
  });
  await alert.present();
}

  private getLimiteCritico(unidad: string): number {
  if (unidad === 'kg') return 8;
  if (unidad === 'litros') return 15;
  if (unidad === 'unidades') return 20;
  return 10;
  }

  obtenerEstado(cantidad: number, unidad: string): string {
    const limite = this.getLimiteCritico(unidad);
    const limiteBajo = limite * 2.5;
    if (cantidad <= limite) return 'Crítico';
    if (cantidad <= limiteBajo) return 'Bajo';
    return 'Normal';
  }

  obtenerClaseEstado(cantidad: number, unidad: string): string {
    const limite = this.getLimiteCritico(unidad);
    const limiteBajo = limite * 2.5;
    if (cantidad <= limite) return 'estado-critico';
    if (cantidad <= limiteBajo) return 'estado-bajo';
    return 'estado-normal';
  }

  obtenerIcono(categoria: string): string {
    switch (categoria.toLowerCase()) {
      case 'carnes': return '🥩';
      case 'verduras': return '🥬';
      case 'frutas': return '🍎';
      case 'hierbas': return '🌿';
      case 'bebidas': return '🥤';
      case 'granos': return '🌾';
      default: return '📦';
    }
  }
}