import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api/jobs';

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  postular(jobId: number, token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this.apiUrl}/${jobId}/apply`, {}, { headers });
  }
}
