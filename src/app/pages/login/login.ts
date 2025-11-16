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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  goHome() {
    this.router.navigate(['/home']);
  }

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
        console.log("ID:", resp.id);

        // 🔥 GUARDAR SESIÓN CORRECTA
        this.authService.saveSession(resp.token, resp.role, resp.id);

        // 🔥 REDIRECCIÓN SEGÚN ROL BACKEND
        switch (resp.role) {
          case 'ROLE_USER':
            this.router.navigate(['/perfil']);
            break;
          case 'ROLE_COMPANY':
            this.router.navigate(['/empresa']);
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
