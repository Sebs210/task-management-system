import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { Task, TaskStatus } from '../models/task.model'; // Import TaskStatus

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all tasks', () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: 'Desc 1',
        status: TaskStatus.TODO,
      },
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(
      'Basic YWRtaW46cGFzc3dvcmQ='
    );
    req.flush(mockTasks);
  });

  it('should create a task', () => {
    const newTask: Task = {
      id: '2',
      title: 'Task 2',
      description: 'Desc 2',
      status: TaskStatus.TODO,
    };

    service.createTask(newTask).subscribe((task) => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(
      'Basic YWRtaW46cGFzc3dvcmQ='
    );
    req.flush(newTask);
  });

  it('should update a task', () => {
    const updatedTask: Task = {
      id: '1',
      title: 'Task 1 Updated',
      description: 'Desc 1 Updated',
      status: TaskStatus.IN_PROGRESS,
    };

    service.updateTask(updatedTask).subscribe((task) => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe(
      'Basic YWRtaW46cGFzc3dvcmQ='
    );
    req.flush(updatedTask);
  });

  it('should delete a task', () => {
    const taskId = '1';

    service.deleteTask(taskId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks/1');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(
      'Basic YWRtaW46cGFzc3dvcmQ='
    );
    req.flush(null);
  });

  it('should handle HTTP error when getting tasks', () => {
    const errorMessage = 'Failed to load tasks';

    service.getTasks().subscribe({
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe(errorMessage);
      },
    });

    const req = httpMock.expectOne('http://localhost:8080/tasks');
    req.flush(errorMessage, { status: 500, statusText: errorMessage });
  });
});
