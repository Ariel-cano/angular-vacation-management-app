import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Dashboard } from '../../model/master';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  masterSrc = inject(MasterService);

  // Переменные для данных
  totalEmployee: number | undefined;
  totalLeaves: number | undefined;
  totalNewLeaves: number | undefined;
  totalApprovedLeaves: number | undefined;
  totalCanceledLeave: number | undefined;

  firstContainerCards = [
    { header: 'Total Employees', value: () => this.totalEmployee },
    { header: 'Total Leave', value: () => this.totalLeaves },
    { header: 'New Leaves', value: () => this.totalNewLeaves },
  ];

  secondContainerCards = [
    { header: 'Approved Leaves', value: () => this.totalApprovedLeaves },
    { header: 'Canceled Leaves', value: () => this.totalCanceledLeave },
  ];

  ngOnInit(): void {
    this.dashboardFunc();
  }

  dashboardFunc(): void {
    this.masterSrc.getHRDashboard().subscribe((res: Dashboard) => {
      this.totalEmployee = res.totalEmployee;
      this.totalApprovedLeaves = res.totalApprovedLeaves;
      this.totalLeaves = res.totalLeaves;
      this.totalNewLeaves = res.totalNewLeaves;
      this.totalCanceledLeave = res.totalCanceledLeave;
    });
  }
}
