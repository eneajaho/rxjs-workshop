import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employees-filter-form',
  templateUrl: './employees-filter-form.component.html',
  styleUrls: ['./employees-filter-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesFilterFormComponent {

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

  onSubmit(): void {
    this.filtered.emit(this.form.value);
  }

}
