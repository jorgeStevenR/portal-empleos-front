import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar';
import { LoadingComponent } from './components/loading/loading.component';
import { TopbarComponent } from './components/topbar/topbar';
import { FooterComponent } from './components/footer/footer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    RouterOutlet,
    NavbarComponent,
    LoadingComponent,
    TopbarComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  currentRoute = '';
  showTopbar = false;

  /** ⭐ Controla si la navbar baja o sube */
  navbarOffset = true;

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        this.currentRoute = event.urlAfterRedirects;

        // ⭐ Mostrar topbar SOLO en /home
        this.showTopbar = this.currentRoute === '/home';

        // ⭐ Mover navbar cuando hay topbar
        this.navbarOffset = this.showTopbar;
      });
  }

  /** ⭐ OCULTAR NAVBAR EN LOGIN Y REGISTROS */
  isLoginPage(): boolean {

    const noNavbarRoutes = [
      '/login',
      '/register-candidato',
      '/register-empresa'
    ];

    return noNavbarRoutes.includes(this.currentRoute);
  }

}
