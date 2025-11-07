// ============================================
// 📂 src/app/pages/register-candidato/register-candidato.ts
// ============================================
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-candidato',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-candidato.html',
  styleUrls: ['./register-candidato.css']
})
export class RegisterCandidatoComponent {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister(): void {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'CANDIDATE'
    };

    this.auth.registerUser(user).subscribe({
      next: () => {
        alert('✅ Registro exitoso. Inicia sesión para continuar.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al registrar el candidato.');
      }
    });
  }
}
