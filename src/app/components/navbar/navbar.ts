// ============================================
// 📂 src/app/components/navbar/navbar.ts
// ============================================
import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {
  role: string | null = null;
  isLoggedIn = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.updateNavbar();
  }

  // 🔹 Refresca el estado del navbar según la sesión actual
  updateNavbar(): void {
    this.role = this.auth.getRole();
    this.isLoggedIn = this.auth.isAuthenticated();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
    this.updateNavbar();
  }

  // ✅ Helpers opcionales para mostrar condicionalmente en el HTML
  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  isCompany(): boolean {
    return this.role === 'COMPANY';
  }

  isUser(): boolean {
    return this.role === 'USER';
  }
}
