import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css']
})
export class TopbarComponent {
  
  hideTopBar = false;
  lastScroll = 0;

  @HostListener('window:scroll')
  onScroll() {
    const currentScroll = window.scrollY;

    if (currentScroll > this.lastScroll) {
      this.hideTopBar = true;   // bajando
    } else {
      this.hideTopBar = false;  // subiendo
    }

    this.lastScroll = currentScroll;
  }

  toggleTheme() {
    document.body.classList.toggle('dark-theme');
  }
}
