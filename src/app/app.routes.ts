import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { EmpresaComponent } from './pages/empresa/empresa';
import { CandidatoComponent } from './pages/candidato/candidato';
import { AdminComponent } from './pages/admin/admin';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { companyGuard } from './guards/company.guard';
import { candidateGuard } from './guards/candidate.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'empresa', component: EmpresaComponent, canActivate: [companyGuard] },
  { path: 'candidato', component: CandidatoComponent, canActivate: [candidateGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: 'home' }
];
