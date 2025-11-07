import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ agrega RouterModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ agrega RouterModule aquí también
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        const { token, role } = res;
        this.auth.saveSession(token, role);

        // 🔁 Redirige según el rol
        if (role === 'ADMIN') this.router.navigate(['/admin']);
        else if (role === 'COMPANY') this.router.navigate(['/empresa']);
        else this.router.navigate(['/candidato']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas o error en el servidor.';
        console.error(err);
      }
    });
  }
}
