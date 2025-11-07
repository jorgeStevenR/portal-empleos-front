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

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();             // limpia token y sesión
    this.router.navigate(['/login']); // redirige al login
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated(); // útil para mostrar u ocultar botones
  }

  getRole(): string | null {
    return this.auth.getRole();
  }
}
