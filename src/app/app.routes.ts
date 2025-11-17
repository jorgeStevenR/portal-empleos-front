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

// 🌿 Perfil de usuario
import { PerfilComponent } from './pages/perfil/perfil';

// 🌿 Perfil empresa
import { PerfilEmpresaComponent } from './pages/perfil-empresa/perfil-empresa';

// 🌿 Postulación
import { PostulacionComponent } from './pages/postulacion/postulacion';

// 🏢 Paneles privados
import { AdminComponent } from './pages/admin/admin';
import { EmpresaComponent } from './pages/empresa/empresa';
import { CandidatoComponent } from './pages/candidato/candidato';

// 🛡️ Guards
import { userGuard } from './guards/user.guard';
import { companyGuard } from './guards/company.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [

  // ===========================
  // RUTA PRINCIPAL
  // ===========================
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // ===========================
  // PÚBLICAS
  // ===========================
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  // Registro
  { path: 'register-candidato', component: RegisterCandidatoComponent },
  { path: 'register-empresa', component: RegisterEmpresaComponent },

  // Ofertas
  { path: 'ofertas-laborales', component: OfertasListComponent },
  { path: 'oferta/:id', component: OfertaDetalleComponent },

  // ===========================
  // PRIVADAS — USUARIO
  // ===========================
  {
    path: 'postulacion/:idJob',
    component: PostulacionComponent,
    canActivate: [userGuard]
  },

  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [userGuard]
  },

  {
    path: 'candidato',
    component: CandidatoComponent,
    canActivate: [userGuard]
  },

  // ===========================
  // PRIVADAS — EMPRESA
  // ===========================
  {
    path: 'perfil-empresa',
    component: PerfilEmpresaComponent,
    canActivate: [companyGuard]
  },

  {
    path: 'empresa',
    component: EmpresaComponent,
    canActivate: [companyGuard]
  },

  // ===========================
  // PRIVADAS — ADMIN
  // ===========================
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard]
  },

  // ===========================
  // 404 - fallback
  // ===========================
  { path: '**', redirectTo: 'home' }
];
