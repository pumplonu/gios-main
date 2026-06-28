import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class LoginPage {
  correo: string = '';
  password: string = '';
  mostrarPassword: boolean = false;
  mensajeError = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  iniciarSesion() {
    const usuario = this.usuarioService.validarLogin(
      this.correo,
      this.password
    );

    if (usuario) {
      this.mensajeError = '';
      this.usuarioService.guardarUsuarioActual(usuario); // ← línea nueva
      this.router.navigate(['/home']); // ← cambiado de /stock a /home
      return;
    }

    this.mensajeError = 'Correo o contraseña incorrectos';
  }
}