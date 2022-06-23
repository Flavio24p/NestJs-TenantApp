import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '../project/entities/project.entity';
import { Tenant } from '../tenant/entities/tenant.entity';
import { TokenInterface } from '../users/dto/token.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  async create(createTaskDto: CreateTaskDto, reqUser: TokenInterface) {
    const task = new Task();
    task.name = createTaskDto.name;
    task.description = createTaskDto.description;
    task.status = createTaskDto?.status;
    task.project = await Project.findOneByOrFail({
      id: createTaskDto.projectId,
    });
    task.tenant = await Tenant.findOneOrFail({
      where: {
        id: reqUser.tenantId,
      },
    });
    return Task.save(task);
  }

  findAll(reqUser: TokenInterface) {
    return Task.find({
      relations: {
        tenant: true,
      },
      where: {
        tenant: {
          id: reqUser.tenantId,
        },
      },
    });
  }

  findOne(id: string, reqUser: TokenInterface) {
    return Task.findOneOrFail({
      relations: {
        tenant: true,
      },
      where: {
        id,
        tenant: {
          id: reqUser.tenantId,
        },
      },
    });
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    reqUser: TokenInterface,
  ) {
    const task = await Task.findOneOrFail({
      relations: {
        tenant: true,
      },
      where: {
        id,
        tenant: {
          id: reqUser.tenantId,
        },
      },
    });
    task.name = updateTaskDto?.name;
    task.description = updateTaskDto?.description;
    task.status = updateTaskDto?.status;
    if (updateTaskDto.projectId)
      task.project = await Project.findOneByOrFail({
        id: updateTaskDto.projectId,
      });
    return Task.save(task);
  }

  async remove(id: string, reqUser: TokenInterface) {
    const task: Task = await Task.findOne({
      relations: {
        tenant: true,
      },
      where: {
        id,
        tenant: {
          id: reqUser.tenantId,
        },
      },
    });
    if (!task) {
      throw new NotFoundException('Task doesnt exists');
    }
    return Task.remove(task);
  }
}
