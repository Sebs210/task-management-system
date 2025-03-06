import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { Task, TaskStatus } from '../../../../core/models/task.model';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  const mockTask: Task = {
    id: '1',
    title: 'Task 1',
    description: 'Desc 1',
    status: TaskStatus.TODO,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = mockTask;
    component.loading = of(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw error if task input is not provided', () => {
    component.task = undefined as any;
    expect(() => component.ngOnInit()).toThrowError(
      'TaskItemComponent: task input is required'
    );
  });

  it('should initialize status options', () => {
    expect(component.statusOptions).toEqual([
      { value: TaskStatus.TODO, label: 'Por Hacer' },
      { value: TaskStatus.IN_PROGRESS, label: 'En Progreso' },
      { value: TaskStatus.COMPLETED, label: 'Completada' },
    ]);
  });

  it('should emit edit event when onEdit is called', () => {
    spyOn(component.edit, 'emit');
    component.onEdit();
    expect(component.edit.emit).toHaveBeenCalledWith(mockTask);
  });

  it('should emit delete event when onDelete is called', () => {
    spyOn(component.delete, 'emit');
    component.onDelete();
    expect(component.delete.emit).toHaveBeenCalledWith('1');
  });

  it('should emit statusChange event when onStatusChange is called', () => {
    spyOn(component.statusChange, 'emit');
    const newStatus = TaskStatus.IN_PROGRESS;
    component.onStatusChange(newStatus);
    expect(component.statusChange.emit).toHaveBeenCalledWith({
      task: mockTask,
      status: newStatus,
    });
  });

  it('should display task details', () => {
    const title =
      fixture.nativeElement.querySelector('mat-card-title').textContent;
    const description =
      fixture.nativeElement.querySelector('mat-card-content p').textContent;
    expect(title).toBe('Task 1');
    expect(description).toBe('Desc 1');
  });
});
