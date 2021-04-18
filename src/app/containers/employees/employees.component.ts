import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: [ './employees.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent {

  vm$ = this.employeeService.state$;

  load = new BehaviorSubject<any>(undefined);

  racing$ = this.load.asObservable().pipe(
    switchMap((value: any) => {
      if (value) {
        if (value?.pageSize) {
          // pagination
          return this.employeeService.loadEmployees(undefined, value);
        } else {
          // filters
          return this.employeeService.loadEmployees(value);
        }
      } else {
        // initial load
        return this.employeeService.loadEmployees();
      }
    })
  );

  constructor(private employeeService: EmployeeService) {}

}
