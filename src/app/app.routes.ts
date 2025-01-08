import { Routes } from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {LayoutPageComponent} from './pages/layout-page/layout-page.component';
import {DashboardPageComponent} from './pages/dashboard-page/dashboard-page.component';
import {EmployeePageComponent} from './pages/employee-page/employee-page.component';
import {NewVacationPageComponent} from './pages/new-vacation-page/new-vacation-page.component';
import {EarnedVacationPageComponent} from './pages/earned-vacation-page/earned-vacation-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    component: LayoutPageComponent,
    children:[
      {
        path: 'vacation-request',
        component: NewVacationPageComponent
      },
      {
        path: 'dashboard',
        component: DashboardPageComponent
      },
      {
        path: 'employee',
        component: EmployeePageComponent
      },
      {
        path: 'earned-vacation',
        component: EarnedVacationPageComponent
      }
    ]
  }
];
