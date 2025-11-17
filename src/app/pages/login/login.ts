// ============================================
// 📂 src/app/pages/login/login.ts
// ============================================
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  // --------------------------------------------------
  // 👁️ NUEVO: CONTROLAR VISIBILIDAD DE LA CONTRASEÑA
  // --------------------------------------------------
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  goHome() {
    this.router.navigate(['/home']);
  }

  // --------------------------------------------------
  // 👁️ NUEVO: FUNCIÓN PARA MOSTRAR/OCULTAR CONTRASEÑA
  // --------------------------------------------------
  togglePassword() {
    this.showPassword = !this.showPassword;

    // Cambiar icono del ojo dinámicamente
    const eye = document.querySelector('.eye') as HTMLElement;
    if (eye) {
      eye.style.backgroundImage = this.showPassword
        ? 'url("assets/icons/eye-off.svg")'
        : 'url("assets/icons/eye.svg")';
    }
  }

  // --------------------------------------------------
  // 🔐 LÓGICA DE LOGIN (NO SE MODIFICA NADA)
  // --------------------------------------------------
  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingrese correo y contraseña.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (resp) => {

        console.log("TOKEN:", resp.token);
        console.log("ROLE:", resp.role);
        console.log("ID:", resp.id); // 🔥 ESTE ES EL ID DEL BACKEND

        // --------------------------------------------------
        // 🔥 GUARDAR SESIÓN SIEMPRE COMO userId
        // --------------------------------------------------
        this.authService.saveSession(resp.token, resp.role, resp.id);

        // --------------------------------------------------
        // 🔥 NORMALIZAR ROL (por si backend manda COMPANY)
        // --------------------------------------------------
        const normalizedRole = resp.role.startsWith('ROLE_')
          ? resp.role
          : `ROLE_${resp.role}`;

        // --------------------------------------------------
        // 🔥 REDIRECCIÓN SEGÚN ROL
        // --------------------------------------------------
        switch (normalizedRole) {
          case 'ROLE_USER':
            this.router.navigate(['/perfil']);
            break;

          case 'ROLE_COMPANY':
            this.router.navigate(['/perfil-empresa']);
            break;

          case 'ROLE_ADMIN':
            this.router.navigate(['/admin']);
            break;

          default:
            this.router.navigate(['/home']);
        }

        this.loading = false;
      },

      error: () => {
        this.errorMessage = 'Credenciales incorrectas.';
        this.loading = false;
      }
    });
  }
}
