import { Injectable } from '@angular/core';

export interface Usuario {

  id:number;

  nombre:string;

  correo:string;

  password:string;

  telefono:string;

  rol:string;

}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly STORAGE_KEY = 'usuarios';

  constructor() {}

  obtenerUsuarios():Usuario[]{

    const datos = localStorage.getItem(
      this.STORAGE_KEY
    );

    return datos
      ? JSON.parse(datos)
      : [];

  }

  guardarUsuario(
    usuario:Omit<Usuario,'id'>
  ){

    const usuarios =
      this.obtenerUsuarios();

    const nuevo:Usuario = {

      id:Date.now(),

      ...usuario

    };

    usuarios.push(nuevo);

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(usuarios)
    );

  }

  eliminarUsuario(id:number){

    const usuarios =
      this.obtenerUsuarios();

    const actualizados =
      usuarios.filter(
        usuario => usuario.id !== id
      );

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(actualizados)
    );

  }

  actualizarUsuario(
    usuarioActualizado:Usuario
  ){

    const usuarios =
      this.obtenerUsuarios();

    const actualizados =
      usuarios.map(usuario =>

        usuario.id === usuarioActualizado.id
          ? usuarioActualizado
          : usuario

      );

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(actualizados)
    );

  }

  validarLogin(
    correo:string,
    password:string
  ):Usuario | null {

    const usuarios =
      this.obtenerUsuarios();

    const usuario =
      usuarios.find(

        u =>

        u.correo === correo &&
        u.password === password

      );

    return usuario || null;

  }

obtenerUsuarioActual(): Usuario | null {
  const datos = localStorage.getItem('usuarioActual');
  return datos ? JSON.parse(datos) : null;
}

guardarUsuarioActual(usuario: Usuario) {
  localStorage.setItem('usuarioActual', JSON.stringify(usuario));
}

cerrarSesion() {
  localStorage.removeItem('usuarioActual');
}


}