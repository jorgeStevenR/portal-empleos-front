import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar';
import { LoadingComponent } from './components/loading/loading.component';
import { TopbarComponent } from './components/topbar/topbar';
import { filter } from 'rxjs/operators';
import { FooterComponent } from './components/footer/footer';

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

  // ⭐ ESTA ES LA PROPIEDAD QUE FALTABA
  navbarOffset = true;

  constructor(private router: Router) {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {

        this.currentRoute = event.urlAfterRedirects;

        // ⭐ Mostrar topbar SOLO en /home
        this.showTopbar = this.currentRoute === '/home';

        // ⭐ Si hay topbar → navbar baja
        // ⭐ Si NO hay topbar → navbar sube
        this.navbarOffset = this.showTopbar;
      });
  }

  isLoginPage(): boolean {
    return this.currentRoute === '/login';
  }

}
