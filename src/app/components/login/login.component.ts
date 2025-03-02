import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  
  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(this.username));
        localStorage.setItem('role', response.role);
        
        if(response.role === 'manager') {
          this.authService.router.navigate(['/manager']);
        } else {
          this.authService.router.navigate(['/dashboard']);
        }
      },
      error => {
        alert('Invalid credentials');
      }
    );  }
}