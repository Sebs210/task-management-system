import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { taskReducer } from './store/task.reducer';
import { TaskEffects } from './store/task.effects';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent, TaskItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature('tasks', taskReducer),
    EffectsModule.forFeature([TaskEffects]),
  ],
  exports: [TaskListComponent, TaskFormComponent, TaskItemComponent],
})
export class TasksModule {}
