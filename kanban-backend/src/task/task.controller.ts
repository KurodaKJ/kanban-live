import { Controller, Get, Post, Body } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getTasks() {
    return this.taskService.getTasks();
  }

  @Post()
  createTask(@Body() body) {
    return this.taskService.createTask(body);
  }

    @Post('update')
    updateTask(@Body() body) {
        return this.taskService.updateTask(body.id, body);
    }

    @Post('delete')
    deleteTask(@Body() body) {
        return this.taskService.deleteTask(body.id);
    }
}
