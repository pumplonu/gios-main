import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
InventarioService
} from '../../services/inventario';
import { ReporteService } from '../../services/reporte';
import {
UsuarioService
}
from '../../services/usuario';
import {

IonContent,
IonInput,
IonItem,
IonButton,
IonSelect,
IonSelectOption

} from '@ionic/angular/standalone';

@Component({

selector:'app-registro-insumo',
templateUrl:'./registro-insumo.page.html',
styleUrls:['./registro-insumo.page.scss'],
standalone:true,

imports:[

CommonModule,
FormsModule,

IonContent,
IonInput,
IonItem,
IonButton,
IonSelect,
IonSelectOption

]

})

export class RegistroInsumoPage {

nombre='';
categoria='';
cantidad='';
unidad='';
fecha='';

constructor(
private router:Router,
private inventarioService:InventarioService,
private reporteService: ReporteService
){}

guardarInsumo(){

this.inventarioService.guardarInsumo({

nombre:this.nombre,

categoria:this.categoria,

cantidad:Number(this.cantidad),

unidad:this.unidad,

fecha:this.fecha

});

this.reporteService.registrarActividad(
  'Registró insumo',
  `Insumo: ${this.nombre} | Cantidad: ${this.cantidad} ${this.unidad} | Categoría: ${this.categoria}`
);
this.router.navigate(['/registro-exitoso']);
}

cancelar() {
  this.router.navigate(['/home']);
}

}