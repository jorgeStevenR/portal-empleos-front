// ============================================
// 📂 src/app/app.routes.ts
// ============================================

// 🌿 Páginas públicas
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterCandidatoComponent } from './pages/register-candidato/register-candidato';
import { RegisterEmpresaComponent } from './pages/register-empresa/register-empresa';
import { OfertasListComponent } from './pages/ofertas-laborales/ofertas-list/ofertas-list';
import { OfertaDetalleComponent } from './pages/ofertas-laborales/oferta-detalle/oferta-detalle';
import { PerfilComponent } from './pages/perfil/perfil';

// 🏢 Páginas privadas
import { EmpresaComponent } from './pages/empresa/empresa';
import { CandidatoComponent } from './pages/candidato/candidato';
import { AdminComponent } from './pages/admin/admin';

// 🛡️ Guards
import { adminGuard } from './guards/admin.guard';
import { companyGuard } from './guards/company.guard';
import { candidateGuard } from './guards/candidate.guard';

// 🧭 Rutas principales
import { Routes } from '@angular/router';

export const routes: Routes = [
  // Página inicial
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

  // Perfil (💡 mover antes del wildcard)
  { path: 'perfil', component: PerfilComponent },

  // Áreas protegidas
  {
    path: 'empresa',
    component: EmpresaComponent,
    canActivate: [companyGuard],
    data: { expectedRole: 'COMPANY' }
  },
  {
    path: 'candidato',
    component: CandidatoComponent,
    canActivate: [candidateGuard],
    data: { expectedRole: 'CANDIDATE' }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    data: { expectedRole: 'ADMIN' }
  },

  // Catch-all (⬅️ ahora al final)
  { path: '**', redirectTo: 'home' }
];
