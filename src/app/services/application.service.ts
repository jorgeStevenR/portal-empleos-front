// ============================================
// 📂 src/app/services/application.service.ts
// ============================================
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  // Este endpoint es SOLO para crear, listar, actualizar y borrar postulaciones
  private apiUrl = `${environment.apiBaseUrl}/applications`;

  constructor(private http: HttpClient) {}

  // ==========================
  // POSTULAR (crear)
  // ==========================
  create(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // ==========================
  // LISTAR TODAS
  // ==========================
  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // ==========================
  // OBTENER POR ID
  // ==========================
  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // ==========================
  // POSTULACIONES DE UN USUARIO
  // ==========================
  getByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);
  }

  // ===========================================================
  // ⭐⭐⭐ POSTULACIONES DE UN EMPLEO (CORREGIDO)
  //     Este es el endpoint REAL de tu backend:
  //     GET /api/jobs/{idJob}/applications
  // ===========================================================
  getByJobId(jobId: number): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/jobs/${jobId}/applications`);
  }

  // ==========================
  // ACTUALIZAR
  // ==========================
  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // ==========================
  // ELIMINAR
  // ==========================
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ==========================
  // CAMBIAR ESTADO DE UNA POSTULACIÓN
  // ==========================
  updateStatus(idApp: number, newStatus: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${idApp}/status`, {
      status: newStatus
    });
  }
}
