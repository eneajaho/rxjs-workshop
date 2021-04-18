import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { Pagination } from '../../models/pagination';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: [ './employees-table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesTableComponent {

  @Input() data: Employee[] = [];
  @Input() pagination: Pagination = { pageIndex: 0, pageSize: 10 };

  @Output() paginated = new EventEmitter<PageEvent>();

  displayedColumns = [ 'id', 'firstName', 'lastName', 'email', 'phone', 'active', 'image' ];

}
