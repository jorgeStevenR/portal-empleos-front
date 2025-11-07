import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const companyGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const role = auth.getRole();
  if (role === 'COMPANY') {
    return true;
  } else {
    alert('Acceso restringido. Solo empresas.');
    router.navigate(['/home']);
    return false;
  }
};
