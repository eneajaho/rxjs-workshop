import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeFilter } from '../../models/employee-filter';

@Component({
  selector: 'app-employees-filter-form',
  templateUrl: './employees-filter-form.component.html',
  styleUrls: ['./employees-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesFilterFormComponent implements OnInit {

  @Input() filters: EmployeeFilter | null = null;

  form = this.fb.group({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    active: '',
  });

  @Output() filtered = new EventEmitter<Employee>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.filters) {
      this.form.patchValue(this.filters);
    }
  }

  onSubmit(): void {
    this.filtered.emit(this.form.value);
  }

}
