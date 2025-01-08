import {Component, inject, OnInit} from '@angular/core';
import {MasterService} from '../../service/master.service';
import {Dashboard} from '../../model/master';
import {Data} from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  ngOnInit(): void {
      this.dashboardFunc()
  }
  masterSrc = inject(MasterService);
  totalEmployee: number | undefined;
  totalLeaves: number | undefined;
  totalNewLeaves: number | undefined;
  totalApprovedLeaves: number | undefined;
  totalCanceledLeave: number | undefined;
  dashboardFunc(){
    this.masterSrc.getHRDashboard().subscribe((res: Dashboard) => {
      this.totalEmployee = res.totalEmployee;
      this.totalApprovedLeaves = res.totalApprovedLeaves;
      this.totalLeaves = res.totalLeaves;
      this.totalNewLeaves = res.totalNewLeaves;
      this.totalCanceledLeave = res.totalCanceledLeave;
    })
  }
}
