import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIResponse, Dashboard, EarnedLeave, Employee, LeaveRequest} from '../model/master';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl : string = 'https://projectapi.gerasim.in/api/EmployeeManagement/';
  loggedUserData: any;
  constructor(private http: HttpClient) {
    const localData =  localStorage.getItem('vacationUser');
    if (localData) {
      this.loggedUserData = JSON.parse(localData);
    }
  }



  getDepartment(): Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetParentDepartment")
  }
  getChildDepartmentByParentId(id: string):Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetChildDepartmentByParentId?deptId=" + id)
  }

  createNewEmployee(obj: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.apiUrl}CreateEmployee`, obj)
  }

  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUrl + "GetAllEmployees")
  }

  deleteEmp(id: number): Observable<Employee>{
    return this.http.delete<Employee>(this.apiUrl + "DeleteEmployee/" + id)
  }
  getAllChildDepartment(): Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetAllChildDepartment")
  }
  updateEmployee(emp : Employee): Observable<Employee>{
    return this.http.put<Employee>(this.apiUrl + "UpdateEmployee/" + emp.employeeId, emp)
  }

  addEarnedLeave(emp : EarnedLeave): Observable<APIResponse>{
    return this.http.post<APIResponse>(this.apiUrl + "AddNewEarnedLeave", emp)
  }
  getAllEarnedLeaves(): Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetAllEarnedLeaves")
  }
  getLeaveType(): Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetLeaveTypes")
  }
  newRequest(emp : LeaveRequest): Observable<APIResponse>{
    return this.http.post<APIResponse>(this.apiUrl + "CreateNewLeaveRequest", emp)
  }
  getAllLeaveRequestByEmpId(id : number): Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetAllLeaveRequestByEmpId?id=" + id)
  }
  getAllLeaveRequest(): Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "GetAllLeaveRequest")
  }

  changeLeaveStatus(leaveId: number, status: string ): Observable<APIResponse>{
    return this.http.get<APIResponse>(this.apiUrl + "ChangeLeaveStatus?leaveId="+leaveId+"&status="+status)
  }
  getHRDashboard(): Observable<Dashboard>{
    return this.http.get<Dashboard>(this.apiUrl + "getHRDashboard")
  }


}


