import { createAction, props } from '@ngrx/store';
import { Task } from '../../../core/models/task.model';

// Load tasks
export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: Task[] }>()
);
export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: any }>()
);

// Create task
export const createTask = createAction(
  '[Task] Create Task',
  props<{ task: Task }>()
);
export const createTaskSuccess = createAction(
  '[Task] Create Task Success',
  props<{ task: Task }>()
);
export const createTaskFailure = createAction(
  '[Task] Create Task Failure',
  props<{ error: any }>()
);

// Update task
export const updateTask = createAction(
  '[Task] Update Task',
  props<{ task: Task }>() // Pass the entire task object (including id)
);
export const updateTaskSuccess = createAction(
  '[Task] Update Task Success',
  props<{ task: Task }>()
);
export const updateTaskFailure = createAction(
  '[Task] Update Task Failure',
  props<{ error: any }>()
);

// Delete task
export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: string }>()
);
export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ id: string }>()
);
export const deleteTaskFailure = createAction(
  '[Task] Delete Task Failure',
  props<{ error: any }>()
);
