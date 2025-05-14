import {Component, inject, OnInit} from '@angular/core';
import {APIResponse, ChildDept, Employee, ParentDept} from '../../model/master';
import {FormsModule} from '@angular/forms';
import {MasterService} from '../../service/master.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css'
})
export class EmployeePageComponent implements OnInit {
   employeeObj: Employee = new Employee();
   parentDeptId: string = '';
   parentDepartmentList: ParentDept [] = [];
   childDepartmentList: ChildDept [] = [];
   employeeList: Employee [] = [];
   masterSrv = inject(MasterService);

   ngOnInit(): void {
     this.loadEmployee();
     this.loadParentDept();
   }
   loadParentDept(){
     this.masterSrv.getDepartment().subscribe((res: APIResponse)=>{
       this.parentDepartmentList = res.data;
     })
   }
  getAllChild(){
    this.masterSrv.getAllChildDepartment().subscribe((res: APIResponse)=>{
      this.childDepartmentList = res.data;
    })
  }
  loadEmployee(){
    this.masterSrv.getAllEmployees().subscribe((res: Employee[])=>{
      this.employeeList = res;
    })
  }
  onDeptChange(){
     this.masterSrv.getChildDepartmentByParentId(this.parentDeptId).subscribe((res: APIResponse)=>{
       this.childDepartmentList = res.data;
     })
  }
  onSaveEmployee(){
     this.masterSrv.createNewEmployee(this.employeeObj).subscribe((res: Employee)=>{
         alert("Employee added successfully");
         this.employeeObj = new Employee();
         this.loadEmployee();
     })
  }
  onUpdateEmployee(){
    this.masterSrv.updateEmployee(this.employeeObj).subscribe((res: Employee)=>{
      alert("Employee added successfully");
      this.employeeObj = new Employee();
      this.loadEmployee();
    })
  }
  onEdit(item: Employee){
     this.employeeObj = item;
     this.getAllChild();
  }
  onDelete(id: number): void {
    const isDelete = confirm("Are you sure you want to delete this employee?");
    if (!isDelete) return;

    this.masterSrv.deleteEmp(id).subscribe({
      next: () => {
        this.loadEmployee();
        alert("Employee deleted successfully");
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 500) {
          alert("Cannot delete employee. First delete all associated vacation requests.");
        } else {
          alert(`Unexpected error: ${error.status} ${error.statusText}`);
        }
      },

    });
  }


}
