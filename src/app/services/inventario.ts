import { Injectable } from '@angular/core';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase.config';

export interface Insumo {
  id: string; 
  nombre: string;
  categoria: string;
  cantidad: number;
  unidad: string;
  fecha: string;
  fechaVencimiento: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private coleccion = collection(db, 'insumos');

  constructor() {}

  async obtenerInsumos(): Promise<Insumo[]> {
    const snapshot = await getDocs(this.coleccion);
    return snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    } as Insumo));
  }

  async guardarInsumo(insumo: Omit<Insumo, 'id'>): Promise<void> {
    await addDoc(this.coleccion, insumo);
  }

  async eliminarInsumo(id: string): Promise<void> {
    await deleteDoc(doc(db, 'insumos', id));
  }

  async actualizarInsumo(insumoActualizado: Insumo): Promise<void> {
    const { id, ...datos } = insumoActualizado;
    await updateDoc(doc(db, 'insumos', id), datos);
  }

}