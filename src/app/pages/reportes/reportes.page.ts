import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonCard, IonCardContent,
  IonItem, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import { ReporteService, Actividad } from '../../services/reporte';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonCard, IonCardContent,
    IonItem, IonSelect, IonSelectOption
  ]
})
export class ReportesPage implements OnInit {
  fechasDisponibles: string[] = [];
  fechaSeleccionada: string = '';
  actividadesFiltradas: Actividad[] = [];
  esAdmin = false;

  constructor(
    private reporteService: ReporteService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    const usuario = this.usuarioService.obtenerUsuarioActual();
    this.esAdmin = usuario?.rol === 'admin';
  }

  async ionViewWillEnter() {
  this.fechasDisponibles = await this.reporteService.obtenerFechasDisponibles();
  if (this.fechasDisponibles.length > 0) {
    this.fechaSeleccionada = this.fechasDisponibles[0];
    await this.filtrarPorFecha();
    }
  }

  async filtrarPorFecha() {
  const actividades = await this.reporteService.obtenerPorFecha(this.fechaSeleccionada);
  this.actividadesFiltradas = this.esAdmin
    ? actividades
    : actividades.filter(a => 
      a.accion !== 'Registró usuario' &&
      a.accion !== 'Editó usuario' &&
      a.accion !== 'Eliminó usuario'
    );
  }
}