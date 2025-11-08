// ============================================
// 📂 src/app/services/application.service.ts
// ============================================
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient, private auth: AuthService) {}

  /** 🟢 Crear nueva postulación */
  create(application: any): Observable<any> {
    return this.http.post(this.apiUrl, application, { headers: this._headers() });
  }

  /** 🟢 Obtener todas las postulaciones (requiere token) */
  getAll(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this._headers() });
  }

  /** 🟢 Buscar postulación por ID */
  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this._headers() });
  }

  /** 🟢 Buscar postulaciones por usuario */
  getByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`, { headers: this._headers() });
  }

  /** 🟢 Actualizar postulación */
  update(id: number, application: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, application, { headers: this._headers() });
  }

  /** 🟢 Eliminar postulación */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this._headers() });
  }

  /** 🧩 Método privado para generar encabezados con token */
  private _headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`,
      'Content-Type': 'application/json'
    });
  }
}
