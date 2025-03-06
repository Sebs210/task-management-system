import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as TaskActions from './task.actions';
import { TaskService } from 'src/app/core/services/task.service';

@Injectable()
export class TaskEffects {
  constructor(private actions$: Actions, private taskService: TaskService) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      switchMap(() =>
        this.taskService.getTasks().pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) =>
            of(TaskActions.loadTasksFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTask),
      switchMap(({ task }) =>
        this.taskService.createTask(task).pipe(
          map((createdTask) =>
            TaskActions.createTaskSuccess({ task: createdTask })
          ),
          catchError((error) =>
            of(TaskActions.createTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTask),
      switchMap(({ task }) =>
        this.taskService.updateTask(task).pipe(
          map((updatedTask) =>
            TaskActions.updateTaskSuccess({ task: updatedTask })
          ),
          catchError((error) =>
            of(TaskActions.updateTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      switchMap(({ id }) =>
        this.taskService.deleteTask(id).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id })),
          catchError((error) =>
            of(TaskActions.deleteTaskFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
