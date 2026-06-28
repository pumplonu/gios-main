import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {

IonContent,
IonButton

} from '@ionic/angular/standalone';

import { Router } from '@angular/router';

@Component({

selector:'app-registro-exitoso',
templateUrl:'./registro-exitoso.page.html',
styleUrls:['./registro-exitoso.page.scss'],
standalone:true,

imports:[

CommonModule,
IonContent,
IonButton

]

})

export class RegistroExitosoPage {

constructor(
private router:Router
){}

volverLogin(){

this.router.navigate(
['/home']
);

}

}