import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async getTodos(@Request() req) {
    return this.todosService.getTodos(req.user.userId);
  }

  @Post()
  async createTodo(@Request() req, @Body() body) {
    return this.todosService.createTodo(req.user.userId, body);
  }

  @Put(':id')
  async updateTodo(@Request() req, @Param('id') id: number, @Body() body) {
    return this.todosService.updateTodo(req.user.userId, id, body);
  }

  @Delete(':id')
  async deleteTodo(@Request() req, @Param('id') id: number) {
    return this.todosService.deleteTodo(req.user.userId, id);
  }
}
