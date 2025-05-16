import {Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MasterService} from '../../service/master.service';
import {APIResponse, EarnedLeave, Employee, LeaveRequest, LeaveType} from '../../model/master';
import {Observable} from 'rxjs';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import {startBeforeEndValidator} from '../../validators/validateDate.validator';

@Component({
  selector: 'app-new-vacation-page',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, DatePipe, NgIf],
  templateUrl: './new-vacation-page.component.html',
  styleUrl: './new-vacation-page.component.css'
})
export class NewVacationPageComponent implements OnInit {
  vacationForm: FormGroup = new FormGroup({});
  masterSrc = inject(MasterService);
  leaveTypeList = signal<LeaveType[]>([]);
  requestList: LeaveRequest[] = [];
  employee$: Observable<Employee[]> = new Observable<Employee[]>();
  totalLeaves: number = 0;
  earnedLeaves: EarnedLeave[] = [];

  constructor() {
    this.initializeForm();
    this.employee$ = this.masterSrc.getAllEmployees();
  }

  initializeForm(){
    this.vacationForm = new FormGroup({
      leaveId: new FormControl(0),
      employeeId: new FormControl(this.masterSrc.loggedUserData.role == 'Employee' ? this.masterSrc.loggedUserData.employeeId : null, Validators.required),
      leaveTypeId: new FormControl(null, Validators.required),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', Validators.required),
      status: new FormControl('New'),
      reason: new FormControl(''),
      requestDate: new FormControl(new Date())
    },{validators: startBeforeEndValidator()});
    if (this.masterSrc.loggedUserData.role == 'Employee'){
      this.vacationForm.controls['employeeId'].disable();
    }
  }
  ngOnInit(): void {
    this.getLeaveType();
    this.getGriData();
  }
  getGriData(){
    if(this.masterSrc.loggedUserData.role == 'Employee'){
      this.getData()
    } else{
      this.getAllData()
    }
  }
  getData(){
    this.masterSrc.getAllLeaveRequestByEmpId(this.masterSrc.loggedUserData.employeeId).subscribe((res:APIResponse)=>{
      this.requestList = res.data;
    })
  }
  getAllData(){
    this.masterSrc.getAllLeaveRequest().subscribe((res:APIResponse)=>{
      this.requestList = res.data;
    })
  }

  getLeaveType(){
    this.masterSrc.getLeaveType().subscribe((Res: APIResponse)=>{
      this.leaveTypeList.set(Res.data);
    })
  }
  onSave(){
    const formValue = this.vacationForm.getRawValue();
    this.masterSrc.newRequest(formValue).subscribe((res:APIResponse)=>{
      if (res.result){
        alert('request Raised')
        this.getGriData();
      }else{
        alert(res.message)
      }
    });
  }
  changeStatus(id: number, empId: number, startDate: string, endDate: string) {
    this.masterSrc.getEarnedLeavesByEmpId(empId).subscribe((res: APIResponse) => {
      if (res.result) {
        this.earnedLeaves = [];
        this.earnedLeaves = [res.data];
        this.totalLeaves = res.data.totalEarnedLeaves;

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          alert("Некорректный формат даты");
          return;
        }

        const timeDiff =  start.getTime() - end.getTime() ;
        const requestedDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
        console.log("Запрошено дней отпуска:", requestedDays);

        if (this.totalLeaves >= requestedDays && this.totalLeaves >= 0) {
          this.masterSrc.changeLeaveStatus(id, "Approved").subscribe((Res: APIResponse) => {
            this.leaveTypeList.set(Res.data);
            this.getGriData();
          });
        } else {
          alert("The employee's available vacation is over");
        }
      } else {
        alert('This employee has been deleted');
      }
    });
  }


  deleteRequest(id: number){
    const isDelete = confirm("Are you sure want to delete this leave request?");
    if (!isDelete) return;
    this.masterSrc.deleteLeaveRequestId(id).subscribe((Res: APIResponse)=>{
      this.getGriData();
    })
  }

}
