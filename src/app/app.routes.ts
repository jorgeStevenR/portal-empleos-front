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
import { PostulacionComponent } from './pages/postulacion/postulacion';

// 🏢 Páginas privadas
import { AdminComponent } from './pages/admin/admin';
import { EmpresaComponent } from './pages/empresa/empresa';
import { CandidatoComponent } from './pages/candidato/candidato';

// 🛡️ Guards
import { adminGuard } from './guards/admin.guard';
import { companyGuard } from './guards/company.guard';
import { userGuard } from './guards/user.guard';

// 🧭 Angular Router
import { Routes } from '@angular/router';

export const routes: Routes = [
  // 🏠 Página inicial
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // 🔐 Autenticación
  { path: 'login', component: LoginComponent },

  // 🧾 Registro
  { path: 'register-candidato', component: RegisterCandidatoComponent },
  { path: 'register-empresa', component: RegisterEmpresaComponent },

  // 🌿 Ofertas laborales (públicas)
  { path: 'ofertas-laborales', component: OfertasListComponent },
  { path: 'oferta/:id', component: OfertaDetalleComponent },

  // 📝 Postulación (solo usuario logueado)
  {
    path: 'postulacion/:idJob',
    component: PostulacionComponent,
    canActivate: [userGuard],
    data: { expectedRole: 'USER' }
  },

  // 👤 Perfil
  { path: 'perfil', component: PerfilComponent },

  // 👷 Panel de usuario (tu antiguo “candidato”)
  {
    path: 'candidato',
    component: CandidatoComponent,
    canActivate: [userGuard],
    data: { expectedRole: 'USER' }
  },

  // 🏢 Panel de empresa
  {
    path: 'empresa',
    component: EmpresaComponent,
    canActivate: [companyGuard],
    data: { expectedRole: 'COMPANY' }
  },

  // 🛠️ Panel admin
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
    data: { expectedRole: 'ADMIN' }
  },

  // 🚫 Fallback
  { path: '**', redirectTo: 'home' }
];
