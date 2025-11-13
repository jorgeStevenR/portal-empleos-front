import { Component } from '@angular/core';
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
export class Navbar {
  constructor(private auth: AuthService, private router: Router) {}

  get isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  isUser() {
    return this.auth.isUser();
  }

  isCompany() {
    return this.auth.isCompany();
  }

  isAdmin() {
    return this.auth.isAdmin();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
