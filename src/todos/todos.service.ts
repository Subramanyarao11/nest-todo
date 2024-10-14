import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async getTodos(userId: number) {
    return this.prisma.todo.findMany({ where: { userId } });
  }

  async createTodo(userId: number, data: Prisma.TodoCreateInput) {
    return this.prisma.todo.create({
      data: { ...data, user: { connect: { id: userId } } },
    });
  }

  async updateTodo(
    userId: number,
    todoId: number,
    data: Prisma.TodoUpdateInput,
  ) {
    return this.prisma.todo.updateMany({
      where: { id: todoId, userId },
      data,
    });
  }

  async deleteTodo(userId: number, todoId: number) {
    return this.prisma.todo.deleteMany({
      where: { id: todoId, userId },
    });
  }
}
