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

  isDark = false;

  constructor(private auth: AuthService, private router: Router) {}

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

  toggleTheme(): void {
    this.isDark = !this.isDark;
  }
}
