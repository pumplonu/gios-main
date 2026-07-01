import { Injectable } from '@angular/core';

export interface Actividad {
  id: number;
  fecha: string;
  hora: string;
  usuario: string;
  accion: string;
  detalle: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private readonly STORAGE_KEY = 'actividades';

  registrarActividad(accion: string, detalle: string) {
    const usuarioActual = localStorage.getItem('usuarioActual');
    const usuario = usuarioActual ? JSON.parse(usuarioActual).nombre : 'Desconocido';

    const ahora = new Date();
    const nueva: Actividad = {
      id: Date.now(),
      fecha: ahora.toLocaleDateString('es-PE'),
      hora: ahora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      usuario,
      accion,
      detalle
    };

    const actividades = this.obtenerActividades();
    actividades.push(nueva);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actividades));
  }

  obtenerActividades(): Actividad[] {
    const datos = localStorage.getItem(this.STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
  }

  obtenerPorFecha(fecha: string): Actividad[] {
    return this.obtenerActividades().filter(a => a.fecha === fecha);
  }

  obtenerFechasDisponibles(): string[] {
    const actividades = this.obtenerActividades();
    const fechas = actividades.map(a => a.fecha);
    return [...new Set(fechas)].reverse();
  }
}
