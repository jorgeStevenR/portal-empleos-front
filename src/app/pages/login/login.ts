// ============================================
// 📂 src/app/pages/login/login.ts
// ============================================

import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class LoginComponent implements OnInit, OnDestroy {

  email = '';
  password = '';
  loading = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // ⛔ Aplica FIX: Evita que el style.css global dañe el login
  ngOnInit() {
    document.body.classList.add('login-page-active');
  }

  ngOnDestroy() {
    document.body.classList.remove('login-page-active');
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

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
        this.authService.saveSession(resp.token, resp.role, resp.id);

        const normalizedRole = resp.role.startsWith('ROLE_')
          ? resp.role
          : `ROLE_${resp.role}`;

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
