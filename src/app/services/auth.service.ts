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

  // ====================
  // LOGIN GENERAL
  // ====================
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // ====================
  // REGISTRO CANDIDATO
  // ====================
  registerUser(user: any): Observable<any> {
    return this.http.post(this.usersUrl, user);
  }

  // ====================
  // REGISTRO EMPRESA
  // ====================
  registerCompany(company: any): Observable<any> {
    return this.http.post(this.companiesUrl, company);
  }

  // =====================================================
  // ⭐ GUARDAR SESIÓN (FUNCIONA PARA USERS Y COMPANIES)
  // =====================================================
  saveSession(token: string, role: string, id: number): void {

    // Normalizar rol (ROLE_USER, ROLE_COMPANY)
    const normalizedRole = role.startsWith('ROLE_') ? role : `ROLE_${role}`;

    localStorage.setItem('token', token);
    localStorage.setItem('role', normalizedRole);

    // Guardamos SIEMPRE en userId sin importar si es USER o COMPANY
    if (id != null) {
      localStorage.setItem('userId', id.toString());
    }
  }

  // ====================
  // GETTERS
  // ====================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && token.trim() !== '';
  }

  // ====================
  // ROLES
  // ====================
  isUser(): boolean {
    return this.getRole() === 'ROLE_USER';
  }

  isCompany(): boolean {
    return this.getRole() === 'ROLE_COMPANY';
  }

  isAdmin(): boolean {
    return this.getRole() === 'ROLE_ADMIN';
  }

  // ====================
  // LOGOUT
  // ====================
  logout(): void {
    localStorage.clear();
  }
}
