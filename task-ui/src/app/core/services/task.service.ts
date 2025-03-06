import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8080/tasks'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Add Basic Authentication headers
  private getAuthHeaders(): HttpHeaders {
    const username = 'admin';
    const password = 'password';
    const auth = btoa(`${username}:${password}`); // Encode credentials in Base64
    return new HttpHeaders({
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    });
  }

  // GET all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // POST a new task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, {
      headers: this.getAuthHeaders(),
    });
  }

  // PUT (update) a task
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task, {
      headers: this.getAuthHeaders(),
    });
  }

  // DELETE a task
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
