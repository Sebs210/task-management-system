import { createReducer, on } from '@ngrx/store';
import { Task } from '../../../core/models/task.model';
import * as TaskActions from './task.actions';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: any;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const taskReducer = createReducer(
  initialState,

  // Load tasks
  on(TaskActions.loadTasks, (state) => {
    console.log('Reducer: loadTasks action received');
    return { ...state, loading: true, error: null };
  }),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => {
    console.log('Reducer: loadTasksSuccess with tasks:', tasks);
    return { ...state, tasks, loading: false, error: null };
  }),
  on(TaskActions.loadTasksFailure, (state, { error }) => {
    console.log('Reducer: loadTasksFailure with error:', error);
    return { ...state, loading: false, error };
  }),

  // Create task
  on(TaskActions.createTask, (state) => {
    console.log('Reducer: createTask action received');
    return { ...state, loading: true, error: null };
  }),
  on(TaskActions.createTaskSuccess, (state, { task }) => {
    console.log('Reducer: createTaskSuccess with task:', task);
    return {
      ...state,
      tasks: [...state.tasks, task],
      loading: false,
      error: null,
    };
  }),
  on(TaskActions.createTaskFailure, (state, { error }) => {
    console.log('Reducer: createTaskFailure with error:', error);
    return { ...state, loading: false, error };
  }),

  // Update task
  on(TaskActions.updateTask, (state) => {
    console.log('Reducer: updateTask action received');
    return { ...state, loading: true, error: null };
  }),
  on(TaskActions.updateTaskSuccess, (state, { task }) => {
    console.log('Reducer: updateTaskSuccess with task:', task);
    return {
      ...state,
      tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
      loading: false,
      error: null,
    };
  }),
  on(TaskActions.updateTaskFailure, (state, { error }) => {
    console.log('Reducer: updateTaskFailure with error:', error);
    return { ...state, loading: false, error };
  }),

  // Delete task
  on(TaskActions.deleteTask, (state) => {
    console.log('Reducer: deleteTask action received');
    return { ...state, loading: true, error: null };
  }),
  on(TaskActions.deleteTaskSuccess, (state, { id }) => {
    console.log('Reducer: deleteTaskSuccess with id:', id);
    return {
      ...state,
      tasks: state.tasks.filter((t) => t.id !== id),
      loading: false,
      error: null,
    };
  }),
  on(TaskActions.deleteTaskFailure, (state, { error }) => {
    console.log('Reducer: deleteTaskFailure with error:', error);
    return { ...state, loading: false, error };
  })
);
