import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../models/leave.model';

@Injectable({ providedIn: 'root' })
export class LeaveService {
    private apiUrl = 'http://localhost:3000/';
  private http = inject(HttpClient);
  
  getLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrl+'leaves');
  }
  
  applyLeave(request: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(this.apiUrl+'leaves', request);
  }
  
  updateLeaveStatus(id: number, status: 'Approved' | 'Rejected'): Observable<LeaveRequest> {
    return this.http.patch<LeaveRequest>(`${this.apiUrl+'leaves'}/${id}`, { status });
  }
}