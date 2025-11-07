// ============================================
// 📂 src/app/services/user.service.ts
// ============================================
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private auth: AuthService) {}

  // 🔹 Helper para headers con token
  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }

  // 🔹 Registrar usuario (no necesita token)
  register(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  // 🔹 Actualizar usuario (requiere autenticación)
  update(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Obtener todos los usuarios (admin)
  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // 🔹 Buscar por ID
  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Buscar por email
  getByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/email/${email}`, {
      headers: this.getAuthHeaders()
    });
  }

  // 🔹 Eliminar usuario
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
