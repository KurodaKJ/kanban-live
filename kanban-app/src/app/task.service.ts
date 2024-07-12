import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Task {
  id?: number;
  title: string;
  description: string;
  priority: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createTask(task: Task): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  updateTask(task: Task): Observable<any> {
    return this.http.post(`${this.apiUrl}/update`, task);
  }

  deleteTask(task: Task): Observable<any> {
    return this.http.post(`${this.apiUrl}/delete`, task);
  }
}
