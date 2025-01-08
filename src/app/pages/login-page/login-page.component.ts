import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginObj: any = {
    userName: '',
    password: ''
  }

  http= inject(HttpClient);
  router = inject(Router);

  onLogin(){
    this.http.post("https://projectapi.gerasim.in/api/EmployeeManagement/login", this.loginObj).subscribe((res: any) => {
      if (res.result){
        localStorage.setItem("vacationUser", JSON.stringify(res.data));
        this.router.navigateByUrl('dashboard');
      }else{
        alert(res.message);
      }
    })
  }
}
