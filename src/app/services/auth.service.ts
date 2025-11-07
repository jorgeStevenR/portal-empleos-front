import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) this.currentUserSubject.next({ token, role });
  }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  saveSession(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    this.currentUserSubject.next({ token, role });
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
