// ============================================
// 📂 src/app/services/auth.service.ts
// ============================================
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = environment.apiBaseUrl;
  private apiUrl = `${this.baseUrl}/auth`;
  private usersUrl = `${this.baseUrl}/users`;
  private companiesUrl = `${this.baseUrl}/companies`;

  constructor(private http: HttpClient) {}

  // ============================================
  // 🔹 LOGIN general
  // ============================================
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // ============================================
  // 🔹 REGISTRO CANDIDATO
  // ============================================
  registerUser(user: any): Observable<any> {
    return this.http.post(this.usersUrl, user);
  }

  // ============================================
  // 🔹 REGISTRO EMPRESA
  // ============================================
  registerCompany(company: any): Observable<any> {
    return this.http.post(this.companiesUrl, company);
  }

  // ============================================
  // 🔹 GUARDAR SESIÓN
  // ============================================
  saveSession(token: string, role: string, userId?: number): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    if (userId) {
      localStorage.setItem('userId', userId.toString());
    }
  }

  // ============================================
  // 🔹 Obtener token
  // ============================================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ============================================
  // 🔹 Obtener rol
  // ============================================
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // ============================================
  // 🔹 Obtener ID usuario autenticado
  // ============================================
  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  }

  // ============================================
  // 🔥 MÉTODOS DE VALIDACIÓN
  // ============================================
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && token.trim() !== '';
  }

  isUser(): boolean {
    return this.getRole() === 'ROLE_USER';
  }

  isCompany(): boolean {
    return this.getRole() === 'ROLE_COMPANY';
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }

  // ============================================
  // 🔹 CERRAR SESIÓN
  // ============================================
  logout(): void {
    localStorage.clear();
  }
}
