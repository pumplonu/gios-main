import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonCard, IonCardContent,
  IonButton, AlertController
} from '@ionic/angular/standalone';
import { UsuarioService, Usuario } from '../../services/usuario';
import { ReporteService } from '../../services/reporte';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.page.html',
  styleUrls: ['./ver-usuarios.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonButtons, IonBackButton, IonCard, IonCardContent,
    IonButton
  ]
})
export class VerUsuariosPage implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private reporteService: ReporteService,
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  ionViewWillEnter() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarios = this.usuarioService.obtenerUsuarios();
  }

  async confirmarEliminar(id: number, nombre: string) {
    const alert = await this.alertController.create({
      header: '¿Eliminar usuario?',
      message: `¿Estás seguro de eliminar a "${nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.usuarioService.eliminarUsuario(id);
            this.reporteService.registrarActividad(
              'Eliminó usuario',
              `Usuario: ${nombre}`
            );
            this.cargarUsuarios();
          }
        }
      ]
    });
    await alert.present();
  }

  async editarUsuario(item: Usuario) {
    const alert = await this.alertController.create({
      header: 'Editar Usuario',
      inputs: [
        { name: 'nombre', type: 'text', placeholder: 'Nombre', value: item.nombre },
        { name: 'correo', type: 'email', placeholder: 'Correo', value: item.correo },
        { name: 'telefono', type: 'text', placeholder: 'Teléfono', value: item.telefono }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            this.usuarioService.actualizarUsuario({
              ...item,
              nombre: data.nombre,
              correo: data.correo,
              telefono: data.telefono
            });
            this.reporteService.registrarActividad(
              'Editó usuario',
              `Usuario: ${data.nombre} | Correo: ${data.correo}`
            );
            this.cargarUsuarios();
          }
        }
      ]
    });
    await alert.present();
  }
}