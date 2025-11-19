// ============================================
// 📂 src/app/components/navbar/navbar.ts
// ============================================

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  @Input() navbarOffset: boolean = false;

  logoZoom = false; // ⭐ Estado animación

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  // ⭐ Animación al clicar + redirección al home
  animateLogo() {
    this.logoZoom = true;

    setTimeout(() => {
      this.logoZoom = false;
    }, 220);
  }

  goHome() {
    this.animateLogo();

    setTimeout(() => {
      this.router.navigate(['/home']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 120);
  }

  // -----------------------------------------------------

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  isUser(): boolean {
    return this.auth.isUser();
  }

  isCompany(): boolean {
    return this.auth.isCompany();
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
