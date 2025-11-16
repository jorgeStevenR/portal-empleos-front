// ============================================
// 📂 src/app/components/navbar/navbar.ts
// ============================================
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  constructor(public auth: AuthService, private router: Router) {}

  // 🔹 Se calcula SIEMPRE contra el AuthService (no se queda viejo)
  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  // 🔹 Helpers por rol (usan el servicio directamente)
  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  isCompany(): boolean {
    return this.auth.isCompany();
  }

  isUser(): boolean {
    return this.auth.isUser();
  }

  // 🔹 Cerrar sesión
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
