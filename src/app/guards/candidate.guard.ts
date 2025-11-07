import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const candidateGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const role = auth.getRole();
  if (role === 'USER') {
    return true;
  } else {
    alert('Acceso restringido. Solo candidatos.');
    router.navigate(['/home']);
    return false;
  }
};
