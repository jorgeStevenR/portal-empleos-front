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

  getAllJobs(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  create(job: any): Observable<any> {
    const headers = this._headers();
    return this.http.post(this.apiUrl, job, { headers });
  }

  update(id: number, job: any): Observable<any> {
    const headers = this._headers();
    return this.http.put(`${this.apiUrl}/${id}`, job, { headers });
  }

  delete(id: number): Observable<any> {
    const headers = this._headers();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  // 🔹 Postularse (candidato)
  postular(idJob: number, idUser: number, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const body = {
      user: { idUser },
      job: { idJob },
      coverLetter: 'Estoy interesado en la vacante.',
      urlImg: 'https://imgur.com/mi_cv.png',
      status: 'ENVIADA'
    };
    return this.http.post(this.applyUrl, body, { headers });
  }

  private _headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.auth.getToken()}`
    });
  }
}
