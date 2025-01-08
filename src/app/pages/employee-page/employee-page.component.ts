import {Component, inject, OnInit} from '@angular/core';
import {APIResponse, ChildDept, Employee, ParentDept} from '../../model/master';
import {FormsModule} from '@angular/forms';
import {MasterService} from '../../service/master.service';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [FormsModule],
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
  onDelete(id: number){
    const isDelete = confirm("Are you sure want to delete this employee?");
    if (isDelete) {
      this.masterSrv.deleteEmp(id).subscribe((res: Employee)=>{
        this.loadEmployee();
      })
    }
  }

}
