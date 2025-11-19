import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { App } from './app/app';
import { routes } from './app/app.routes';

// Interceptores
import { tokenInterceptor } from './app/interceptors/token.interceptor';
import { errorInterceptor } from './app/interceptors/error.interceptor';
import { loadingInterceptor } from './app/interceptors/loading.interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        tokenInterceptor,     // 🟢 PRIMERO: Adjunta el token JWT
        loadingInterceptor,   // 🟡 Barra de carga
        errorInterceptor      // 🔴 Maneja errores globales
      ])
    )
  ]
}).catch(err => console.error('❌ Error al iniciar la app:', err));
