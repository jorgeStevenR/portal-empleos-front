// ============================================
// 📂 src/app/services/job.service.ts
// ============================================
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/jobs';
  private applyUrl = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient, private auth: AuthService) {}

  /** 🔹 Obtener todas las ofertas */
  getAllJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /** 🔹 Obtener oferta por ID */
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /** 🔹 Crear una nueva oferta (empresa) */
  create(job: any): Observable<any> {
    const headers = this._headers();
    return this.http.post<any>(this.apiUrl, job, { headers });
  }

  /** 🔹 Actualizar una oferta */
  update(id: number, job: any): Observable<any> {
    const headers = this._headers();
    return this.http.put<any>(`${this.apiUrl}/${id}`, job, { headers });
  }

  /** 🔹 Eliminar oferta */
  delete(id: number): Observable<any> {
    const headers = this._headers();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  /** 🆕 🔹 Obtener ofertas de una empresa específica */
  getByCompany(idCompany: number): Observable<any[]> {
    const headers = this._headers();
    return this.http.get<any[]>(`${this.apiUrl}/company/${idCompany}`, { headers });
  }

  /** 🔹 Postularse (candidato) */
  postular(idJob: number, idUser: number, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const body = {
      user: { idUser },
      job: { idJob },
      coverLetter: 'Estoy interesado en la vacante.',
      urlImg: 'https://imgur.com/mi_cv.png',
      status: 'ENVIADA'
    };
    return this.http.post<any>(this.applyUrl, body, { headers });
  }

  /** 🔹 Headers con token */
  private _headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`,
      'Content-Type': 'application/json'
    });
  }
}
