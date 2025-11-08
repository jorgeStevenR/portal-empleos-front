// ============================================
// 📂 src/app/app.routes.ts
// ============================================

import { Routes } from '@angular/router';

// 🌿 Páginas públicas
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterCandidatoComponent } from './pages/register-candidato/register-candidato';
import { RegisterEmpresaComponent } from './pages/register-empresa/register-empresa';
import { OfertasListComponent } from './pages/ofertas-laborales/ofertas-list/ofertas-list';
import { OfertaDetalleComponent } from './pages/ofertas-laborales/oferta-detalle/oferta-detalle';
import { PerfilComponent } from './pages/perfil/perfil';
import { PostulacionComponent } from './pages/postulacion/postulacion';

// 🏢 Páginas privadas
import { AdminComponent } from './pages/admin/admin';
import { EmpresaComponent } from './pages/empresa/empresa';
import { CandidatoComponent } from './pages/candidato/candidato';

// 🛡️ Guards
import { authGuard } from './guards/auth.guard';
import { userGuard } from './guards/user.guard';
import { companyGuard } from './guards/company.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // Autenticación
  { path: 'login', component: LoginComponent },

  // Registro
  { path: 'register-candidato', component: RegisterCandidatoComponent },
  { path: 'register-empresa', component: RegisterEmpresaComponent },

  // Ofertas públicas
  { path: 'ofertas-laborales', component: OfertasListComponent },
  { path: 'oferta/:id', component: OfertaDetalleComponent },

  // Postulación (solo usuario)
  {
    path: 'postulacion/:idJob',
    component: PostulacionComponent,
    canActivate: [userGuard]
  },

  // Perfil
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },

  // Panel de usuario
  {
    path: 'candidato',
    component: CandidatoComponent,
    canActivate: [userGuard]
  },

  // Panel de empresa
  {
    path: 'empresa',
    component: EmpresaComponent,
    canActivate: [companyGuard]
  },

  // Panel admin
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
  },

  // Fallback
  { path: '**', redirectTo: 'home' }
];
