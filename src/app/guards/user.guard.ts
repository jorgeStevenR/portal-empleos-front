// ============================================
// 📂 src/app/guards/user.guard.ts
// ============================================
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const userGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();
  const role = auth.getRole();

  if (token && role === 'USER') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
