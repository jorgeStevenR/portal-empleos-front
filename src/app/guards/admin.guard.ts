// ============================================
// 📂 src/app/guards/admin.guard.ts
// ============================================
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();
  const role = auth.getRole();

  if (token && role === 'ADMIN') {
    return true;
  } else {
    alert('⚠️ Solo los administradores pueden acceder.');
    router.navigate(['/login']);
    return false;
  }
};
