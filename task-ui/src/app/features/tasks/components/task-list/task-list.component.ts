import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Task, TaskStatus } from '../../../../core/models/task.model';
import * as TaskActions from '../../store/task.actions';
import * as fromTask from '../../store/task.selectors';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  TaskStatus = TaskStatus;

  constructor(private store: Store, private dialog: MatDialog) {
    this.tasks$ = this.store.select(fromTask.selectAllTasks);
    this.loading$ = this.store.select(fromTask.selectTasksLoading);
    this.error$ = this.store.select(fromTask.selectTasksError);
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.store.dispatch(TaskActions.loadTasks());
  }

  openTaskForm(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: { task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.store.dispatch(TaskActions.updateTask({ task: result }));
        } else {
          // Backend expects an ID, so we'll let the backend generate it
          // Remove client-side ID generation
          this.store.dispatch(TaskActions.createTask({ task: result }));
        }
      }
    });
  }

  updateTaskStatus(task: Task, status: TaskStatus): void {
    const updatedTask = { ...task, status };
    this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
  }

  deleteTask(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.store.dispatch(TaskActions.deleteTask({ id }));
    }
  }
}
