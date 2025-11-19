import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private apiUrl = `${environment.apiBaseUrl}/companies`;
  private uploadUrl = `${environment.apiBaseUrl}/files/upload/logo`;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  // 🟢 CREAR EMPRESA
  create(company: any): Observable<any> {
    return this.http.post(this.apiUrl, company);
  }

  // 🔵 OBTENER TODAS LAS EMPRESAS
  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // 🔵 OBTENER EMPRESA POR ID
  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // 🔵 ACTUALIZAR EMPRESA
  update(id: number, company: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, company);
  }

  // 🔴 ELIMINAR EMPRESA
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 🟢 SUBIR LOGO A S3
  uploadLogo(companyId: number, file: File): Observable<any> {
    const token = this.auth.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append("file", file);

    return this.http.post(
      `${this.uploadUrl}/${companyId}`,
      formData,
      { headers }
    );
  }
}
