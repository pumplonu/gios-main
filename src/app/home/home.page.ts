import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonGrid, IonRow, IonCol, IonButtons
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { settingsOutline, 
  cubeOutline, 
  addCircleOutline, 
  personAddOutline, 
  logOutOutline,
  warningOutline } from 'ionicons/icons';
import { UsuarioService } from '../services/usuario';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonGrid, IonRow, IonCol, IonButtons
  ],
})
export class HomePage implements OnInit {
  esAdmin = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    addIcons({ settingsOutline, cubeOutline, addCircleOutline, personAddOutline, logOutOutline, warningOutline });
  }

  ngOnInit() {
    const usuario = this.usuarioService.obtenerUsuarioActual();
    if (usuario) {
      this.esAdmin = usuario.rol === 'admin';
    } else {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
  this.usuarioService.cerrarSesion();
  this.router.navigate(['/login']);
}

}
