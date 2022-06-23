import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ValidationPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Project } from './entities/project.entity';
import { ReqUser } from 'src/commons/decorators/user.decorator';
import { TokenInterface } from '../users/dto/token.interface';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';

@Controller('project')
@ApiBearerAuth('authorization')
@UseGuards(JwtAuthGuard)
@ApiTags('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @HttpCode(200)
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({
    status: 201,
    description: 'Creates a new project',
    type: Project,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(
    @Body(ValidationPipe) createProjectDto: CreateProjectDto,
    @ReqUser() reqUser: TokenInterface,
  ) {
    return this.projectService.create(createProjectDto, reqUser);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all projects',
    type: [Project],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAll(@ReqUser() reqUser: TokenInterface) {
    return this.projectService.findAll(reqUser);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get one project by id',
    type: Project,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  findOne(@Param('id') id: string, @ReqUser() reqUser: TokenInterface) {
    return this.projectService.findOne(id, reqUser);
  }

  @Put(':id')
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({
    status: 200,
    description: 'Update a project',
    type: Project,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @ReqUser() reqUser: TokenInterface,
  ) {
    return this.projectService.update(id, updateProjectDto, reqUser);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete a project',
    type: Project,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  remove(@Param('id') id: string, @ReqUser() reqUser: TokenInterface) {
    return this.projectService.remove(id, reqUser);
  }
}
