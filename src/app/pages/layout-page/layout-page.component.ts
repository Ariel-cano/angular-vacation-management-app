import {Component, inject} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MasterService} from '../../service/master.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  loggedUserData: any;
  index: any;
  router = inject(Router);
  masterSrc = inject(MasterService)

  constructor(){
    const localData =  localStorage.getItem('vacationUser');
    if (localData) {
      this.loggedUserData = JSON.parse(localData);
    }
    if (this.loggedUserData.role == 'Employee') {
      this.router.navigateByUrl('vacation-request');
    }

  }

  onLogoff(){
    localStorage.removeItem('vacationUser');
    this.router.navigateByUrl('login');
  }
}
