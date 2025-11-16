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

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingrese correo y contraseña.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (resp) => {
        console.log('✅ Login exitoso:', resp);

        // Asegúrate de que el backend devuelve { token, role, userId }
        this.authService.saveSession(resp.token, resp.role, resp.userId);

        // 🔁 Redirección según el rol
        switch (resp.role) {
          case 'USER':
            this.router.navigate(['/candidato']);
            break;
          case 'COMPANY':
            this.router.navigate(['/empresa']);
            break;
          case 'ADMIN':
            this.router.navigate(['/admin']);
            break;
          default:
            this.router.navigate(['/home']);
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error en login:', err);
        this.errorMessage = 'Credenciales incorrectas o error del servidor.';
        this.loading = false;
      }
    });
  }
}
