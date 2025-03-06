import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { StoreModule, Store } from '@ngrx/store';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { taskReducer } from '../../store/task.reducer';
import { Task, TaskStatus } from '../../../../core/models/task.model';
import { of } from 'rxjs';
import * as TaskActions from '../../store/task.actions';
import { TaskItemComponent } from '../task-item/task-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let store: Store;
  let dialog: MatDialog;

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Desc 1',
      status: TaskStatus.TODO,
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Desc 2',
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent, TaskItemComponent],
      imports: [
        StoreModule.forRoot({ tasks: taskReducer }),
        MatDialogModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialog,
          useValue: {
            open: jasmine.createSpy('open').and.returnValue({
              afterClosed: () => of(null),
            }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dialog = TestBed.inject(MatDialog);
    spyOn(store, 'dispatch');
    spyOn(store, 'select').and.callFake((selector: any) => {
      if (selector === 'selectAllTasks') return of(mockTasks);
      if (selector === 'selectTasksLoading') return of(false);
      return of([]);
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTasks on init', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(TaskActions.loadTasks());
  });

  it('should open task form dialog', () => {
    component.openTaskForm();
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should dispatch updateTask when task has id', () => {
    const task: Task = {
      id: '1',
      title: 'Task 1 Updated',
      description: 'Desc 1 Updated',
      status: TaskStatus.IN_PROGRESS,
    }; // Use a valid id
    (dialog.open as jasmine.Spy).and.returnValue({
      afterClosed: () => of(task),
    });
    component.openTaskForm(task);
    expect(store.dispatch).toHaveBeenCalledWith(
      TaskActions.updateTask({ task })
    );
  });

  it('should dispatch createTask when task has no id', () => {
    const task: Task = {
      id: undefined,
      title: 'Task 2',
      description: 'Desc 2',
      status: TaskStatus.TODO,
    };
    (dialog.open as jasmine.Spy).and.returnValue({
      afterClosed: () => of(task),
    });
    component.openTaskForm();
    expect(store.dispatch).toHaveBeenCalledWith(
      TaskActions.createTask({ task })
    );
  });

  it('should dispatch updateTask on status change', () => {
    const task: Task = {
      id: '1',
      title: 'Task 1',
      description: 'Desc 1',
      status: TaskStatus.TODO,
    };
    const newStatus = TaskStatus.IN_PROGRESS;
    component.updateTaskStatus(task, newStatus);
    expect(store.dispatch).toHaveBeenCalledWith(
      TaskActions.updateTask({ task: { ...task, status: newStatus } })
    );
  });

  it('should dispatch deleteTask after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const taskId = '1';
    component.deleteTask(taskId);
    expect(store.dispatch).toHaveBeenCalledWith(
      TaskActions.deleteTask({ id: taskId })
    );
  });
});
