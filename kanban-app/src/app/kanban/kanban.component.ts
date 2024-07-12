import { Component, OnInit } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { TaskService } from "../task.service";
import { CommonModule } from '@angular/common'; // Import CommonModule

interface Task {
  id?: number;
  lane: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  tasks: Task[] = [];
  lanes = [
    { title: 'To Do', name: 'todo' },
    { title: 'In Progress', name: 'inprogress' },
    { title: 'Done', name: 'done' },
  ];
  socket!: Socket;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
    this.socket = io('http://localhost:3000');
    this.socket.on('taskUpdated', (task) => {
      this.tasks.push(task);
    });
  }

  getTasksByLane(lane: string) {
    return this.tasks.filter(task => task.lane === lane);
  }
}
