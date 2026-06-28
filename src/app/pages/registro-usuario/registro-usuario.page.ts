import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { Router } from '@angular/router';

import {
UsuarioService
}
from '../../services/usuario';

import {

IonContent,
IonHeader,
IonToolbar,
IonTitle,
IonInput,
IonItem,
IonButton,
IonSelect,
IonSelectOption

} from '@ionic/angular/standalone';

@Component({

selector:'app-registro-usuario',
templateUrl:'./registro-usuario.page.html',
styleUrls:['./registro-usuario.page.scss'],
standalone:true,

imports:[

CommonModule,
FormsModule,

IonContent,
IonHeader,
IonToolbar,
IonTitle,
IonInput,
IonItem,
IonButton,
IonSelect,
IonSelectOption

]

})



export class RegistroUsuarioPage {

nombre='';
correo='';
password='';
telefono='';
rol='';

constructor(

private router:Router,

private usuarioService:UsuarioService

){}

guardarUsuario(){

this.usuarioService.guardarUsuario({

nombre:this.nombre,

correo:this.correo,

password:this.password,

telefono:this.telefono,

rol:this.rol

});

this.router.navigate([
'/registro-exitoso'
]);
}


cancelar() {
  this.router.navigate(['/home']);
}


}