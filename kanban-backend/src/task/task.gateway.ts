import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  sendTaskUpdate(task) {
    this.server.emit('taskUpdated', task);
  }
}
