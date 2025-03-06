import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Task, TaskStatus } from '../../../../core/models/task.model';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let dialogRef: MatDialogRef<TaskFormComponent>;

  const mockTask: Task = {
    id: '1',
    title: 'Task 1',
    description: 'Desc 1',
    status: TaskStatus.TODO,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: { task: undefined } },
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    dialogRef = TestBed.inject(MatDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form in create mode', () => {
    expect(component.isEditMode).toBeFalse();
    expect(component.taskForm.value).toEqual({
      id: null,
      title: '',
      description: '',
      status: TaskStatus.TODO,
    });
  });

  it('should initialize form in edit mode with task data', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [TaskFormComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: { task: mockTask } },
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isEditMode).toBeTrue();
    expect(component.taskForm.value).toEqual(mockTask);
  });

  it('should close dialog with form value on submit if form is valid', () => {
    component.taskForm.setValue({
      id: null,
      title: 'New Task',
      description: 'New Desc',
      status: TaskStatus.TODO,
    });
    component.onSubmit();
    expect(dialogRef.close).toHaveBeenCalledWith({
      id: null,
      title: 'New Task',
      description: 'New Desc',
      status: TaskStatus.TODO,
    });
  });

  it('should not close dialog if form is invalid', () => {
    component.taskForm.setValue({
      id: null,
      title: '', // Invalid (required)
      description: '',
      status: TaskStatus.TODO,
    });
    component.onSubmit();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });
});
