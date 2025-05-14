import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MasterService} from '../../service/master.service';
import {APIResponse, EarnedLeave, Employee} from '../../model/master';
import {Observable} from 'rxjs';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-earned-vacation-page',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, DatePipe, NgForOf, NgIf],
  templateUrl: './earned-vacation-page.component.html',
  styleUrl: './earned-vacation-page.component.css'
})
export class EarnedVacationPageComponent implements OnInit {
  form : FormGroup = new FormGroup({});
  masterSrc = inject(MasterService)
  employee$: Observable<Employee[]> = new Observable<Employee[]>();
  earnedLeaves: EarnedLeave[] = []

  constructor() {
    this.initializeForm();
    this.employee$ = this.masterSrc.getAllEmployees();
  }
  initializeForm(){
    this.form = new FormGroup({
      earnedLeaveId: new FormControl(0),
      employeeId: new FormControl(0),
      totalEarnedLeaves: new FormControl(0),
      lastUpdatedDate: new FormControl(new Date())
    })
  }

  onSave(){
    const formValue = this.form.value;
    this.masterSrc.addEarnedLeave(formValue).subscribe((res: APIResponse)=>{
      if (res.result){
        alert("Leaves modified");
        this.getData();
      }else{
        alert(res.message);
      }
    });
  }
  getData(){
    this.masterSrc.getAllEarnedLeaves().subscribe((res: APIResponse)=>{
      this.earnedLeaves = res.data;
    });
  }
  ngOnInit() {
    this.getData();
  }

  deleteEarnedLeave(id:number){
    const isDelete = confirm("Are you sure want to delete this earned leave?");
    if (isDelete) {
      this.masterSrc.deleteEarnedLeaveById(id).subscribe((res: APIResponse)=>{
          this.getData();
      })
    }
  }

}
