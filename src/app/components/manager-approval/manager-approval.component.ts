import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LeaveRequest } from '../../models/leave.model';
import { LeaveService } from '../../service/leave.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-manager-approval',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-approval.component.html',
})
export class ManagerApprovalComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  
  constructor(private leaveService: LeaveService,private authService: AuthService) {}
  
  ngOnInit() {
    if (this.authService.getRole() !== 'manager') {
      alert('Access Denied');
    }
    else{
    this.leaveService.getLeaveRequests().subscribe(data => {
      this.leaveRequests = data;
    });
  }
  }
  
  updateStatus(id: number, status: 'Approved' | 'Rejected') {
    this.leaveService.updateLeaveStatus(id, status).subscribe(() => {
      this.leaveRequests = this.leaveRequests.map(req => req._id === id ? { ...req, status } : req);
    });
  }
  logout(){
    this.authService.logout();
  }
}