import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { PageEvent } from '@angular/material/paginator';
import { EmployeeFilter } from '../../models/employee-filter';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: [ './employees.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent implements OnInit {

  vm$ = this.employeeService.state$;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.loadEmployees().subscribe();
  }

  filterEmployees(filters: EmployeeFilter): void {
    this.employeeService.loadEmployees(filters).pipe(take(1)).subscribe();
  }

  paginateEmployees({pageIndex, pageSize}: PageEvent): void {
    this.employeeService.loadEmployees(undefined, { pageIndex, pageSize }).subscribe();
  }

}
