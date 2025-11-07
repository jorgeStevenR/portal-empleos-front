import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ Importado RouterModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-candidato',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ Añadido aquí
  templateUrl: './register-candidato.html',
  styleUrl: './register-candidato.css'
})
export class RegisterCandidatoComponent {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'CANDIDATE'
    };

    this.auth.register(user).subscribe({
      next: () => {
        alert('Registro exitoso. Inicia sesión para continuar.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar el candidato. Intenta nuevamente.');
      }
    });
  }
}
