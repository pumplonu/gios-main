import { Injectable } from '@angular/core';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { db } from '../firebase.config';

export interface Usuario {
  id: string; // cambia de number a string (Firestore genera el id)
  nombre: string;
  correo: string;
  password: string;
  telefono: string;
  rol: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private coleccion = collection(db, 'usuarios');

  constructor() {}

  // LISTAR todos los usuarios
  async obtenerUsuarios(): Promise<Usuario[]> {
    const snapshot = await getDocs(this.coleccion);
    return snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    } as Usuario));
  }

  // CREAR usuario nuevo
  async guardarUsuario(usuario: Omit<Usuario, 'id'>): Promise<void> {
    await addDoc(this.coleccion, usuario);
  }

  // ELIMINAR usuario por id
  async eliminarUsuario(id: string): Promise<void> {
    await deleteDoc(doc(db, 'usuarios', id));
  }

  // ACTUALIZAR usuario por id
  async actualizarUsuario(usuarioActualizado: Usuario): Promise<void> {
    const { id, ...datos } = usuarioActualizado;
    await updateDoc(doc(db, 'usuarios', id), datos);
  }

  // VALIDAR LOGIN
  async validarLogin(correo: string, password: string): Promise<Usuario | null> {
    const q = query(
      this.coleccion,
      where('correo', '==', correo),
      where('password', '==', password)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;

    const d = snapshot.docs[0];
    const usuario = { id: d.id, ...d.data() } as Usuario;
    this.guardarUsuarioActual(usuario); // guarda sesión
    return usuario;
  }

  // SESIÓN — sigue en localStorage
  obtenerUsuarioActual(): Usuario | null {
    const datos = localStorage.getItem('usuarioActual');
    return datos ? JSON.parse(datos) : null;
  }

  guardarUsuarioActual(usuario: Usuario): void {
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuarioActual');
  }
}