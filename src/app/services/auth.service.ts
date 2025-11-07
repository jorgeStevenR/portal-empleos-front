import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // 👈 Importa los environments

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // 🧩 URL dinámica según entorno (local o Render)
  private apiUrl = `${environment.apiUrl}/auth`;

  // 🧠 Estado del usuario actual
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Si hay sesión guardada en localStorage, la restauramos
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      this.currentUserSubject.next({ token, role });
    }

    // 🔍 Solo para debug (puedes quitar esto luego)
    console.log('🌍 API URL actual:', this.apiUrl);
  }

  // 🔐 Iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // 🧾 Registrar usuario o empresa
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // 💾 Guardar sesión en localStorage
  saveSession(token: string, role: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.currentUserSubject.next({ token, role });
  }

  // 🚪 Cerrar sesión
  logout(): void {
    localStorage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // 🔎 Obtener rol del usuario actual
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // 🧩 Verificar si hay sesión activa
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
