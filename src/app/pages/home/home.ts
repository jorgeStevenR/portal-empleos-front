import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  /** 🔹 Redirige a ofertas laborales */
  irAOfertas(): void {
    this.router.navigate(['/ofertas-laborales']);
  }

  /** 🔹 Redirige al registro de empresa */
  irARegistroEmpresa(): void {
    this.router.navigate(['/register-empresa']);
  }
}
