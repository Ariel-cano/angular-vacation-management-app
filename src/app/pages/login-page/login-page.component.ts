import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginObj = { userName: '', password: '' };

  http = inject(HttpClient);
  router = inject(Router);

  constructor() {

    // const storedUser = localStorage.getItem("vacationUser");
    // if (storedUser) {
    //   this.router.navigateByUrl('dashboard');
    // }
  }

  onLogin() {
    if (!this.loginObj.userName || !this.loginObj.password) {
      alert('Please enter both username and password.');
      return;
    }

    this.http.post("https://projectapi.gerasim.in/api/EmployeeManagement/login", this.loginObj)
      .subscribe({
        next: (res: any) => {
          if (res.result) {
            localStorage.setItem("vacationUser", JSON.stringify(res.data));
            this.router.navigateByUrl('dashboard');
          } else {
            alert(res.message || 'Login failed. Please try again.');
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          alert('An error occurred during login. Please try again later.');
        }
      });
  }
  validateInputs() {
    return this.loginObj.userName.trim() !== '' && this.loginObj.password.trim() !== '';
  }
}
