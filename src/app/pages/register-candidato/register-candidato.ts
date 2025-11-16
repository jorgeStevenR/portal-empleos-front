// 📂 src/app/pages/register-candidato/register-candidato.ts
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

  constructor(private auth: AuthService, private router: Router) {}

  onRegister(): void {
    if (this.loading) return;

    if (!this.name || !this.email || !this.password) {
      alert('⚠️ Por favor completa todos los campos');
      return;
    }

    this.loading = true;

    // 🔹 IMPORTANTE: mismo formato que el ejemplo que te funciona en Postman
    const nuevoUsuario = {
      name: this.name,
      password: this.password,
      emailEntity: {
        email: this.email
      }
      // ❌ NO mandes "role" desde el front, el back pone ROLE_USER por defecto
    };

    console.log('📨 Enviando registro de usuario:', nuevoUsuario);

    this.auth.registerUser(nuevoUsuario).subscribe({
      next: (resp) => {
        console.log('✅ Candidato registrado:', resp);
        alert('✅ Candidato registrado correctamente');
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Error al registrar candidato:', err);
        this.loading = false;

        // Intentar mostrar el mensaje real del backend
        let msg = '❌ Error al registrar el candidato.';

        if (err.error) {
          if (typeof err.error === 'string') {
            msg = '❌ ' + err.error;
          } else if (err.error.message) {
            msg = '❌ ' + err.error.message;
          }
        }

        if (err.status === 400 && msg === '❌ Error al registrar el candidato.') {
          msg = '❌ El servidor rechazó los datos. Revisa que el correo no esté ya registrado.';
        }

        alert(msg);
      }
    });
  }
}
