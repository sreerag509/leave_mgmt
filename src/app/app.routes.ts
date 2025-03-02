import { Routes } from '@angular/router';

import { AuthGuard, ManagerGuard } from './auth.guard';
import { EmployeeLeaveComponent } from './components/employee-leave/employee-leave.component';
import { ManagerApprovalComponent } from './components/manager-approval/manager-approval.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: EmployeeLeaveComponent, canActivate: [AuthGuard] },
  { path: 'manager', component: ManagerApprovalComponent, canActivate: [AuthGuard, ManagerGuard] },
  { path: '**', redirectTo: 'login' }
];