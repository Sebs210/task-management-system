import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../../../../core/models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @Input() loading!: Observable<boolean>; // Add loading input
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<{
    task: Task;
    status: TaskStatus;
  }>();

  TaskStatus = TaskStatus;
  statusOptions: { value: TaskStatus; label: string }[] = [];

  ngOnInit(): void {
    if (!this.task) {
      throw new Error('TaskItemComponent: task input is required');
    }
    this.statusOptions = this.getStatusOptions();
  }

  onEdit(): void {
    this.edit.emit(this.task);
  }

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  onStatusChange(status: TaskStatus): void {
    this.statusChange.emit({ task: this.task, status });
  }

  getStatusOptions(): { value: TaskStatus; label: string }[] {
    return [
      { value: TaskStatus.TODO, label: 'Por Hacer' },
      { value: TaskStatus.IN_PROGRESS, label: 'En Progreso' },
      { value: TaskStatus.COMPLETED, label: 'Completada' },
    ];
  }
}
