// ============================================
// 📂 src/app/pages/register-empresa/register-empresa.ts
// ============================================
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-empresa.html',
  styleUrls: ['./register-empresa.css']
})
export class RegisterEmpresaComponent {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister(): void {
    const company = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: 'COMPANY'
    };

    this.auth.registerCompany(company).subscribe({
      next: () => {
        alert('✅ Empresa registrada exitosamente. Inicia sesión para continuar.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error(err);
        alert('❌ Error al registrar la empresa.');
      }
    });
  }
}
