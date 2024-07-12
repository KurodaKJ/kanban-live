import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { TaskGateway } from './task.gateway';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService, private taskGateway: TaskGateway) {}

    async getTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    async createTask(data: { title: string; description: string; priority: string; lane: string; status: string }): Promise<Task> {
        const task = await this.prisma.task.create({
            data,
        });
        this.taskGateway.sendTaskUpdate(task);
        return task;
    }

    async updateTask(id: number, data: { lane: string }): Promise<Task> {
        const task = await this.prisma.task.update({
            where: { id },
            data,
        });
        this.taskGateway.sendTaskUpdate(task);
        return task;
    }

    async deleteTask(id: number): Promise<Task> {
        const task = await this.prisma.task.delete({
            where: { id },
        });
        this.taskGateway.sendTaskUpdate(task);
        return task;
    }
}