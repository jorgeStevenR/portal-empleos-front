// ============================================
// 📂 src/app/services/auth.service.ts
// ============================================
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 🌍 URLs principales (ajusta si despliegas en Render)
  private apiUrl = 'http://localhost:8080/api/auth';
  private usersUrl = 'http://localhost:8080/api/users';
  private companiesUrl = 'http://localhost:8080/api/companies';

  constructor(private http: HttpClient) {}

  // 🔹 LOGIN general (usuarios, empresas o admin)
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // 🔹 REGISTRO CANDIDATO
  registerUser(user: any): Observable<any> {
    return this.http.post(this.usersUrl, user);
  }

  // 🔹 REGISTRO EMPRESA
  registerCompany(company: any): Observable<any> {
    return this.http.post(this.companiesUrl, company);
  }

  // 🔹 GUARDAR SESIÓN local
  saveSession(token: string, role: string, userId?: number): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    if (userId) {
      localStorage.setItem('userId', userId.toString());
      console.log('🧠 ID guardado en sesión:', userId);
    }

    console.log('✅ Sesión guardada:', { token, role, userId });
  }

  // 🔹 OBTENER token actual
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // 🔹 OBTENER rol actual
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // 🔹 OBTENER ID del usuario o empresa
  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  }

  // 🔹 VERIFICAR si hay sesión activa
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && token.trim() !== '';
  }

  // 🔹 CERRAR SESIÓN
  logout(): void {
    localStorage.clear();
    console.log('👋 Sesión cerrada correctamente');
  }
}
