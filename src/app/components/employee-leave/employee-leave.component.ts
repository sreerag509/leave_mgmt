import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeaveService } from '../../service/leave.service';
import { AuthService } from '../../service/auth.service';
import { LeaveRequest } from '../../models/leave.model';

@Component({
  selector: 'app-employee-leave',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-leave.component.html',
})
export class EmployeeLeaveComponent implements OnInit {
  leaveForm: FormGroup;
    leaveRequests: LeaveRequest[] = [];
  
  constructor(private fb: FormBuilder, private leaveService: LeaveService,private authService:AuthService) {
    this.leaveForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.leaveService.getLeaveRequests().subscribe(data => {
      this.leaveRequests = data;
    });
  
  }
  
  applyLeave() {
    if (this.leaveForm.valid) {
      this.leaveService.applyLeave(this.leaveForm.value).subscribe(response => {
        alert('Leave applied successfully!');
        this.leaveRequests.push(response)
      });
    }
  }
  logout(){
    this.authService.logout();
  }
}