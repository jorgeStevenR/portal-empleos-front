import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private container: HTMLElement | null = null;

  private ensureContainer(): void {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.classList.add('toast-container');
      document.body.appendChild(this.container);
    }
  }

  show(message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info'): void {
    this.ensureContainer();

    const toast = document.createElement('div');
    toast.classList.add('toast', `toast-${type}`);
    toast.textContent = message;

    this.container!.appendChild(toast);

    // Animación de aparición
    setTimeout(() => toast.classList.add('show'), 10);

    // Desaparece automáticamente
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}
