import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './Employee';
import { EmployeeService } from './employee.service';
import { MatDialog } from '@angular/material/dialog';
import { AddModalComponent } from './add-modal/add-modal.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  public employees: Employee[] = [];
  public deleteEmployee: Employee | null = null;
  public editEmployee: Employee | null = null;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container!.appendChild(button);
    button.click();
  }

  openDialog(employee: Employee | null): void {
    const dialogRef = this.dialog.open(AddModalComponent, {
      data: employee,
      width: '100vh',
      height: '80vh',
      maxWidth: '650px',
      maxHeight: '900px',
    });
    dialogRef.afterClosed().subscribe((result: NgForm) => {
      if (result != undefined && result.valid) {
        if (employee != null) {
          result.value.id = employee.id;
          result.value.employeeID = employee.employeeID;

          this.onUpdateEmloyee(result);
        } else {
          this.onAddEmloyee(result);
        }
      }
    });
  }

  deleteDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: employee,
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result != undefined && result) {
        this.onDeleteEmloyee(employee.id);
      }
    });
  }

  public onDeleteEmloyee(id: number | undefined): void {
    if (id != undefined)
      this.employeeService.deleteEmployee(id).subscribe(
        (_) => {
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
  public onUpdateEmloyee(updateForm: NgForm): void {
    this.employeeService.updateEmployee(updateForm.value).subscribe(
      (response: Employee) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAddEmloyee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (
        employee.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        (
          employee.firstName.toLowerCase() +
          ' ' +
          employee.lastName.toLowerCase()
        ).indexOf(key.toLowerCase()) !== -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
