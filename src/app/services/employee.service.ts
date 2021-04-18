import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Employee } from '../models/employee';
import { environment as env } from '../../environments/environment';
import { catchError, delay, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Pagination } from '../models/pagination';
import { EmployeeFilter } from '../models/employee-filter';
import { createParamsFromObject } from '../utils/create-params-from-object';

export interface EmployeeState {
  data: Employee[];
  pagination: Pagination;
  filters: EmployeeFilter | null;
  error: string | null;
  loading: boolean;
  loaded: boolean;
}

const initialState: EmployeeState = {
  data: [],
  pagination: { pageSize: 10, pageIndex: 0, totalCount: 0 },
  filters: null,
  error: null,
  loading: false,
  loaded: false
};

@Injectable({ providedIn: 'root' })
export class EmployeeService {

  private readonly state = new BehaviorSubject<EmployeeState>(initialState);
  readonly state$ = this.state.asObservable().pipe(distinctUntilChanged());

  private requestCache = new Map<string, { data: Employee[], pagination: Pagination }>();

  get currentState(): EmployeeState { return this.state.getValue(); }

  constructor(private http: HttpClient) {}

  loadEmployees(filters?: EmployeeFilter, pagination?: Partial<Pagination>): Observable<Employee[]> {
    const currentPagination = this.currentState.pagination;
    const newPagination = pagination ? { ...currentPagination, ...pagination } : currentPagination;
    const newFilters = filters ?? this.currentState.filters;

    this.state.next({ ...this.currentState,
      filters: newFilters,
      pagination: newPagination,
      loading: true, error: null, loaded: false
    });

    const { pageSize, pageIndex } = this.currentState.pagination;
    return this.getEmployees(this.currentState.filters ?? {}, { pageSize, pageIndex }).pipe(
      tap((res) => this.setData(res.data, res.pagination)),
      catchError(error => {
        // this.setError(error);
        this.setError('An error has occurred. Please try again later!');
        return of(error);
      })
    );
  }

  private setData(data: Employee[], pagination: Pagination): void {
    this.state.next({ ...this.currentState, data, pagination,
      loading: false, loaded: true, error: null,
    });
  }

  private setError(error: string): void {
    this.state.next({ ...this.currentState, error,
      loading: false, loaded: true, data: []
    });
  }

  private getEmployees(
    filters: Partial<EmployeeFilter> = {},
    pagination: Pagination
  ): Observable<{ data: Employee[], pagination: Pagination }> {

    const params = createParamsFromObject(filters)
      .append('_page', pagination.pageIndex + '')
      .append('_limit', pagination.pageSize + '');

    const paramsString = params.toString();

    // check if the same request is made before, if yes, return it in observable
    if (this.requestCache.has(paramsString)) {
      return of(this.requestCache.get(paramsString)!);
    }

    const path = `${ env.apiUrl }/employees`;

    return this.http.get<Employee[]>(path, { params, observe: 'response' }).pipe(
      // adding delay to mock real life http request
      delay(2000),
      map((res: HttpResponse<Employee[]>) => {
        // get totalCount from response headers
        const totalCount = res.headers.get('X-Total-Count') ?? 100;

        const response = {
          data: res.body ?? [],
          pagination: { ...pagination, totalCount: +totalCount }
        };

        // store response in cache map
        this.requestCache.set(paramsString, response);

        return response;
      })
    );
  }

}
