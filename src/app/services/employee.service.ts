import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { environment as env } from '../../environments/environment';
import { delay } from 'rxjs/operators';
import { Pagination } from '../models/pagination';
import { EmployeeFilter } from '../models/employee-filter';
import { createParamsFromObject } from '../utils/create-params-from-object';

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  constructor(private http: HttpClient) {}

  getEmployees(filters: Partial<EmployeeFilter> = {}, pagination: Pagination): Observable<Employee[]> {
    const params = createParamsFromObject(filters)
      .append('_page', pagination.pageIndex + '')
      .append('_limit', pagination.pageSize + '');
    return this.http.get<Employee[]>(`${ env.apiUrl }/employees`, { params }).pipe(
      // adding delay to mock real life http request
      delay(2000)
    );
  }

}
