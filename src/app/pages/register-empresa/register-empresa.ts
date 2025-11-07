import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // ✅ Importado RouterModule
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ Añadido aquí
  templateUrl: './register-empresa.html',
  styleUrl: './register-empresa.css'
})
export class RegisterEmpresaComponent {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    const company = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'COMPANY'
    };

    this.auth.register(company).subscribe({
      next: () => {
        alert('Registro exitoso. Inicia sesión para continuar.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar la empresa. Intenta nuevamente.');
      }
    });
  }
}
