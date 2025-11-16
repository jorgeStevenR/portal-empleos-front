import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {

  @Input() navbarOffset: boolean = true;

  isDark = false;

  constructor(public auth: AuthService, private router: Router) {}

  toggleTheme() {
    this.isDark = !this.isDark;

    const body = document.querySelector('body');

    if (this.isDark) {
      body?.classList.add('dark-theme');
    } else {
      body?.classList.remove('dark-theme');
    }

    console.log("DARK MODE?", this.isDark);
  }

  get isLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  isAdmin() { return this.auth.isAdmin(); }
  isCompany() { return this.auth.isCompany(); }
  isUser() { return this.auth.isUser(); }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
