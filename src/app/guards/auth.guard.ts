// ============================================
// 📂 src/app/guards/auth.guard.ts
// ============================================
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si hay token → dejar pasar
  if (auth.isAuthenticated()) {
    return true;
  }

  // Si no → redirigir al login
  alert('⚠️ Debes iniciar sesión para acceder a esta sección.');
  router.navigate(['/login']);
  return false;
};
