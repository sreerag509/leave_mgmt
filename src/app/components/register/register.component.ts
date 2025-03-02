import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username = '';
  password = '';
  role: 'employee' | 'manager' = 'employee';
  
  constructor(private authService: AuthService) {}

  register() {
    this.authService.register({ username: this.username, password: this.password, role: this.role }).subscribe(
      () => {
        alert('Registration successful! Please log in.');
        this.authService.router.navigate(['/login']);
      },
      error => {
        alert('Registration failed');
      }
    );  }
}