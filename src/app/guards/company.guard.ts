// ============================================
// 📂 src/app/guards/company.guard.ts
// ============================================
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const companyGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getToken();
  const role = auth.getRole();

  if (token && role === 'COMPANY') {
    return true;
  } else {
    alert('⚠️ Solo las empresas pueden acceder a esta sección.');
    router.navigate(['/login']);
    return false;
  }
};
