import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    if (!this.name || !this.email || !this.password) {
      alert('⚠️ Por favor completa todos los campos');
      return;
    }

    this.loading = true;

    const nuevoUsuario = {
      name: this.name,
      password: this.password,
      role: 'USER',
      emailEntity: {
        email: this.email
      }
    };

    this.http.post(this.apiUrl, nuevoUsuario).subscribe({
      next: () => {
        alert('✅ Candidato registrado correctamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('❌ Error al registrar candidato:', err);
        alert('❌ Error al registrar el candidato.');
      },
      complete: () => (this.loading = false)
    });
  }
}
