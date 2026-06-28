import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonCard, IonCardContent
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

  constructor(private inventarioService: InventarioService) {}

  ngOnInit() {
    this.cargarAlertas();
  }

  ionViewWillEnter() {
    this.cargarAlertas();
  }

  cargarAlertas() {
    const todos = this.inventarioService.obtenerInsumos();
    this.insumosCriticos = todos.filter(item => item.cantidad <= 10);
  }
}
