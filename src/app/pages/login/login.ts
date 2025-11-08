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
  errorMessage = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingresa tus credenciales.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        console.log('🔐 Respuesta del login:', res);

        const token = res.token;
        const role = res.role || 'USER';
        const id = res.userId || res.idUser || res.idCompany || null;

        console.log(`🧭 Rol detectado: ${role} | ID: ${id}`);

        this.auth.saveSession(token, role, id);

        // 🔁 Redirigir según el rol
        switch (role) {
          case 'ADMIN':
            this.router.navigate(['/admin']);
            break;
          case 'COMPANY':
            this.router.navigate(['/empresa']);
            break;
          case 'USER':
            this.router.navigate(['/candidato']);
            break;
          default:
            this.router.navigate(['/home']);
            break;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al iniciar sesión:', err);
        this.loading = false;

        if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Credenciales incorrectas.';
        } else {
          this.errorMessage = 'Error en el servidor. Intenta nuevamente.';
        }
      }
    });
  }

  volverAlInicio() {
    this.router.navigate(['/home']);
  }
}
