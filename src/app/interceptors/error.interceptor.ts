import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { tap } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    tap({
      error: (error) => {
        console.error('❌ Error global:', error);

        if (!error.status) {
          toast.show('🌐 No hay conexión con el servidor.', 'error');
          return;
        }

        switch (error.status) {
          case 0:
            toast.show('🌐 No hay conexión con el servidor.', 'error');
            break;
          case 400:
            toast.show('⚠️ Petición incorrecta.', 'warning');
            break;
          case 401:
            toast.show('⚠️ Sesión expirada. Inicia sesión nuevamente.', 'warning');
            break;
          case 403:
            toast.show('🚫 Acceso denegado.', 'error');
            break;
          case 404:
            toast.show('🔍 Recurso no encontrado.', 'warning');
            break;
          case 500:
            toast.show('💥 Error interno del servidor.', 'error');
            break;
          default:
            toast.show(`⚠️ Error inesperado (${error.status}).`, 'warning');
            break;
        }
      }
    })
  );
};
