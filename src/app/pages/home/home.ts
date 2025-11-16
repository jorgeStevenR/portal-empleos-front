import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../../components/topbar/topbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TopbarComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  irAOfertas(): void {
    this.router.navigate(['/ofertas-laborales']);
  }

  irARegistroEmpresa(): void {
    this.router.navigate(['/register-empresa']);
  }

}
