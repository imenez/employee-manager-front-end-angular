import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { environment } from 'src/environments/environment';



@Injectable({providedIn: 'root'})
//if we dont put the injectable in here, we have to add EmployeeService to providers in app.module.ts  


export class EmployeeService{
    private apiServerUrl = environment.apiBaseUrl;


    constructor(private http: HttpClient){}

    public getEmployees(): Observable<Employee[]>{
        return this.http.get<any>(`${this.apiServerUrl}/employees/findAll`);
    }


    public addEmployee(employee: Employee): Observable<Employee>{
        return this.http.post<Employee>(`${this.apiServerUrl}/employees/add`, employee);
    }

    public getEmployee(employeeId: number): Observable<Employee>{
        return this.http.get<Employee>(`${this.apiServerUrl}/employees/find/${employeeId}`);
    }

    public deleteEmployee(employeeId: number): Observable<String>{
        return this.http.delete<String>(`${this.apiServerUrl}/employees/delete/${employeeId}`);
    }
    public updateEmployee(employee: Employee): Observable<Employee>{
        return this.http.put<Employee>(`${this.apiServerUrl}/employees/update`, employee);
    }

}