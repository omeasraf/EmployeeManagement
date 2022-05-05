import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './Employee';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiURL}/employee/all`);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiURL}/employee/all`, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiURL}/employee/update`, employee);
  }
  public deleteEmployee(employeeID: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiURL}/employee/delete/${employeeID}`
    );
  }
}
