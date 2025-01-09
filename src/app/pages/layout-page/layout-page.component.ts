import { Component, inject } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { MasterService } from '../../service/master.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.css'
})
export class LayoutPageComponent {
  loggedUserData = JSON.parse(localStorage.getItem('vacationUser') || '{}');
  router = inject(Router);

  constructor() {
    if (this.loggedUserData?.role === 'Employee') {
      this.router.navigateByUrl('vacation-request');
    }
  }

  onLogoff() {
    localStorage.removeItem('vacationUser');
    this.router.navigateByUrl('login');
  }
}
