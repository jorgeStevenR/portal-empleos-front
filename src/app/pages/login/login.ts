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
  styleUrl: './login.css'
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

        // ✅ Aseguramos compatibilidad con ambos tipos de respuesta
        const token = res.token;
        const role = res.role;
        const userId = res.userId || res.idUser || res.idCompany || null;

        this.auth.saveSession(token, role, userId);

        // 🔁 Redirección según rol
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (role === 'COMPANY') {
          this.router.navigate(['/empresa']);
        } else {
          // USER → representa al candidato
          this.router.navigate(['/candidato']);
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
}
