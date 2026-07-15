import { Injectable } from '@angular/core';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase.config';

export interface Actividad {
  id: string; // cambia de number a string
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

  private coleccion = collection(db, 'actividades');

  async registrarActividad(accion: string, detalle: string): Promise<void> {
    const usuarioActual = localStorage.getItem('usuarioActual');
    const usuario = usuarioActual
      ? JSON.parse(usuarioActual).nombre
      : 'Desconocido';

    const ahora = new Date();
    await addDoc(this.coleccion, {
      fecha: ahora.toLocaleDateString('es-PE'),
      hora: ahora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      usuario,
      accion,
      detalle
    });
  }

  async obtenerActividades(): Promise<Actividad[]> {
    const q = query(this.coleccion, orderBy('fecha', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    } as Actividad));
  }

  async obtenerPorFecha(fecha: string): Promise<Actividad[]> {
    const actividades = await this.obtenerActividades();
    return actividades.filter(a => a.fecha === fecha);
  }

  async obtenerFechasDisponibles(): Promise<string[]> {
    const actividades = await this.obtenerActividades();
    const fechas = actividades.map(a => a.fecha);
    return [...new Set(fechas)];
  }
}