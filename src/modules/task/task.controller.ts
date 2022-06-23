import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { ReqUser } from 'src/commons/decorators/user.decorator';
import { TokenInterface } from '../users/dto/token.interface';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';

@Controller('task')
@ApiBearerAuth('authorization')
@UseGuards(JwtAuthGuard)
@ApiTags('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @HttpCode(200)
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Creates a new task',
    type: Task,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(
    @Body() createTaskDto: CreateTaskDto,
    @ReqUser() reqUser: TokenInterface,
  ) {
    return this.taskService.create(createTaskDto, reqUser);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all tasks',
    type: [Task],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAll(@ReqUser() reqUser: TokenInterface) {
    return this.taskService.findAll(reqUser);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get one task by id',
    type: Task,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  findOne(@Param('id') id: string, @ReqUser() reqUser: TokenInterface) {
    return this.taskService.findOne(id, reqUser);
  }

  @Put(':id')
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Update a task',
    type: Task,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @ReqUser() reqUser: TokenInterface,
  ) {
    return this.taskService.update(id, updateTaskDto, reqUser);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete a task',
    type: Task,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  remove(@Param('id') id: string, @ReqUser() reqUser: TokenInterface) {
    return this.taskService.remove(id, reqUser);
  }
}
