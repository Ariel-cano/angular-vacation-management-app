import {Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MasterService} from '../../service/master.service';
import {APIResponse, Employee, LeaveRequest, LeaveType} from '../../model/master';
import {Observable} from 'rxjs';
import {AsyncPipe, DatePipe, NgIf} from '@angular/common';

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

  constructor() {
    this.initializeForm();
    this.employee$ = this.masterSrc.getAllEmployees();
  }

  initializeForm(){
    this.vacationForm = new FormGroup({
      leaveId: new FormControl(0),
      employeeId: new FormControl(this.masterSrc.loggedUserData.employeeId),
      leaveTypeId: new FormControl(0),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      status: new FormControl('New'),
      reason: new FormControl(''),
      requestDate: new FormControl(new Date()),
    });
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
  changeStatus(id: number){
    this.masterSrc.changeLeaveStatus(id,"Approved").subscribe((Res: APIResponse)=>{
      this.leaveTypeList.set(Res.data);
      this.getGriData();
    })
  }

}
