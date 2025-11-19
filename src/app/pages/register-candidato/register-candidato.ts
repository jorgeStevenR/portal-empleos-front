import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  loading = false;

  showPassword = false;  // 👁️ Control del ojo

  constructor(private auth: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onRegister(): void {
    if (this.loading) return;

    if (!this.name || !this.email || !this.password) {
      alert('⚠️ Por favor completa todos los campos');
      return;
    }

    this.loading = true;

    const nuevoUsuario = {
      name: this.name,
      password: this.password,
      emailEntity: { email: this.email }
    };

    this.auth.registerUser(nuevoUsuario).subscribe({
      next: () => {
        alert('✅ Candidato registrado correctamente');
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;

        let msg = '❌ Error al registrar el candidato.';
        if (err.error?.message) msg = '❌ ' + err.error.message;

        alert(msg);
      }
    });
  }
}
