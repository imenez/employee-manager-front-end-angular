import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})  
export class AppComponent implements OnInit{

  

  public employeez!: Employee[];

  public editEmployee!: Employee;
  public deleteEmployee!: Employee;

  constructor(private employeeService: EmployeeService ){}
  


  ngOnInit(){
    this.getEmployees();
    
  }




  public getEmployees(): void {

    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employeez = response;
        console.log(this.employeez);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );

  }

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById("add-employee-form")?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: any): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: any) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    
    /*
    const container = document.getElementById("main-container");
    const div = document.createElement("div") ;
    div.setAttribute("id", "alert-div");
    div.setAttribute("class", "alert alert-success");
    div.innerText = "employee is deleted.";
    container?.appendChild(div);
    */
    
    alert('employee is deleted.');
    

    
    
  }


  

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employeez) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employeez = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }


  public onOpenModal(employee: any, mode: String): void {

    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");

    if(mode === "add"){
      button.setAttribute("data-target", "#addEmployeeModal");
    }
    else if(mode === "edit"){
      this.editEmployee = employee;
      button.setAttribute("data-target", "#updateEmployeeModal");
    }
    else if(mode === "delete"){
      this.deleteEmployee = employee;
      button.setAttribute("data-target", "#deleteEmployeeModal");
    } 

    container?.appendChild(button);
    button.click();

  }





  

}
