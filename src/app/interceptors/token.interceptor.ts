import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * Interceptor para agregar el token JWT a cada solicitud HTTP.
 * Solo añade el encabezado Authorization si existe un token válido en localStorage.
 */
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  // Si no hay token, deja pasar la solicitud sin modificar
  if (!token) {
    return next(req);
  }

  // Clona la solicitud y agrega el header Authorization: Bearer TOKEN
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
