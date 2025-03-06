import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => {
    console.log('Selector: selectAllTasks returning:', state.tasks);
    return state.tasks;
  }
);

export const selectTasksLoading = createSelector(
  selectTaskState,
  (state: TaskState) => {
    console.log('Selector: selectTasksLoading returning:', state.loading);
    return state.loading;
  }
);

export const selectTasksError = createSelector(
  selectTaskState,
  (state: TaskState) => {
    console.log('Selector: selectTasksError returning:', state.error);
    return state.error;
  }
);
