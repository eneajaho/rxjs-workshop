import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { take } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { EmployeeFilter } from '../../models/employee-filter';
import { Pagination } from '../../models/pagination';
import { isEqual } from '../../utils/is-equal';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: [ './employees.component.scss' ]
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  loading = false;
  error: string | null = null;
  filters = {};
  pagination: Pagination = { pageSize: 10, pageIndex: 0, totalCount: 1000 };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees(undefined, this.pagination);
  }

  fetchEmployees(filters: Partial<EmployeeFilter> = {}, pagination: Pagination): void {
    this.loading = true;
    this.employeeService.getEmployees(filters, pagination).pipe(take(1)).subscribe(
      res => {
        this.employees = res;
        this.loading = false;
      },
      err => {
        this.error = 'An error has occurred. Please try again later!';
        this.loading = false;
      }
    );
  }

  filterEmployees(filters: EmployeeFilter): void {
    if (isEqual(this.filters, filters)) {
      return;
    }
    this.filters = filters;
    this.fetchEmployees(filters, this.pagination);
  }

  paginateEmployees({pageIndex, pageSize}: PageEvent): void {
    this.pagination = { pageIndex, pageSize, totalCount: 1000 };
    this.fetchEmployees(this.filters, this.pagination);
  }

}
