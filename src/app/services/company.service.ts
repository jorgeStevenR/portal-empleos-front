import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiUrl = 'http://localhost:8080/api/companies';

  constructor(private http: HttpClient) {}

  register(company: any): Observable<any> {
    return this.http.post(this.apiUrl, company);
  }

  update(id: number, company: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, company);
  }

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
