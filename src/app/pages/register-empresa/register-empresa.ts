// ============================================
// 📂 src/app/pages/register-empresa/register-empresa.ts
// ============================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-register-empresa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-empresa.html',
  styleUrls: ['./register-empresa.css']
})
export class RegisterEmpresaComponent {

  nit = '';
  name = '';
  email = '';
  password = '';
  website = '';
  location = '';
  description = '';
  loading = false;

  // 👁️ Nuevo: control del ojo
  showPassword = false;

  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {}

  // 👁️ Cambiar visible / oculto
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onRegister(): void {

    if (this.loading) return;

    if (!this.name || !this.email || !this.password || !this.nit) {
      alert('⚠️ Por favor completa los campos obligatorios.');
      return;
    }

    this.loading = true;

    const newCompany = {
      nit: this.nit,
      name: this.name,
      website: this.website || null,
      location: this.location || 'Sin especificar',
      description: this.description || 'Sin descripción',
      password: this.password,
      emailEntity: {
        email: this.email
      }
    };

    this.companyService.create(newCompany).subscribe({

      next: () => {
        alert('✅ Empresa registrada correctamente.');
        this.loading = false;
        this.router.navigate(['/login']);
      },

      error: (err: HttpErrorResponse) => {
        console.error('❌ Error al registrar empresa:', err);

        let msg = '❌ Error al registrar la empresa.';
        if (err.error?.message) msg = '❌ ' + err.error.message;

        alert(msg);
        this.loading = false;
      }
    });
  }

}
