import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from '../prisma/prisma.service';
import { TaskGateway } from './task.gateway';

@Module({
  providers: [TaskService, PrismaService, TaskGateway],
  controllers: [TaskController],
})
export class TaskModule {}
