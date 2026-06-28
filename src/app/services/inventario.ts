import { Injectable } from '@angular/core';

export interface Insumo {

  id:number;

  nombre:string;

  categoria:string;

  cantidad:number;

  unidad:string;

  fecha:string;

}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private readonly STORAGE_KEY = 'insumos';

  constructor() {}

  obtenerInsumos():Insumo[]{

    const datos = localStorage.getItem(
      this.STORAGE_KEY
    );

    return datos
      ? JSON.parse(datos)
      : [];

  }

  guardarInsumo(insumo:Omit<Insumo,'id'>){

    const insumos =
      this.obtenerInsumos();

    const nuevo:Insumo = {

      id:Date.now(),

      ...insumo

    };

    insumos.push(nuevo);

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(insumos)
    );

  }

  eliminarInsumo(id:number){

    const insumos =
      this.obtenerInsumos();

    const actualizados =
      insumos.filter(
        item => item.id !== id
      );

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(actualizados)
    );

  }

  actualizarInsumo(insumoActualizado:Insumo){

    const insumos =
      this.obtenerInsumos();

    const actualizados =
      insumos.map(item =>

        item.id === insumoActualizado.id
          ? insumoActualizado
          : item

      );

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(actualizados)
    );

  }

}