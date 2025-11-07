// ============================================
// 📂 src/app/guards/auth.guard.ts
// ============================================
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Verificamos si hay sesión activa (token válido en localStorage)
  if (auth.isAuthenticated()) {
    return true;
  } else {
    alert('⚠️ Debes iniciar sesión para acceder a esta sección');
    router.navigate(['/login']);
    return false;
  }
};
