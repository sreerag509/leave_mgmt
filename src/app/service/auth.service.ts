import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface User {
  username: string;
  password: string;
  role: 'employee' | 'manager';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = 'http://localhost:3000';
  
    constructor(private http: HttpClient, public router: Router) {}
  
    register(user: User): Observable<any> {
      return this.http.post(`${this.apiUrl}/register`, user);
    }
  
    login(username: string, password: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, { username, password });
    }
  
    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        this.router.navigate(['/login']);
      }
    
      getRole(): 'employee' | 'manager' | null {
        return localStorage.getItem('role') as 'employee' | 'manager' | null;
      }
    
      isAuthenticated(): boolean {
        return localStorage.getItem('token') !== null;
      }
}
