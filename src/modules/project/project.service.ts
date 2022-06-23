import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Tenant } from '../tenant/entities/tenant.entity';
import { TokenInterface } from '../users/dto/token.interface';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  async create(createProjectDto: CreateProjectDto, reqUser: TokenInterface) {
    const project = new Project();
    project.name = createProjectDto.name;
    project.description = createProjectDto.description;
    project.tenant = await Tenant.findOneBy({ id: reqUser.tenantId });
    return Project.save(project);
  }

  async findAll(reqUser: TokenInterface): Promise<Project[]> {
    return Project.find({
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
    return Project.findOneOrFail({
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
    updateProjectDto: UpdateProjectDto,
    reqUser: TokenInterface,
  ) {
    const project = await Project.findOneOrFail({
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
    project.name = updateProjectDto.name;
    project.name = updateProjectDto.name;
    return Project.save(project);
  }

  async remove(id: string, reqUser: TokenInterface) {
    const project = await Project.findOne({
      relations: {
        tenant: true,
        tasks: true,
      },
      where: {
        id,
        tenant: {
          id: reqUser.tenantId,
        },
      },
    });
    if (!project) {
      throw new NotFoundException('Project doesnt exists');
    }
    if (project.tasks) {
      throw new ForbiddenException(
        'This project has active tasks, delete those first to be able to delete the entire project',
      );
    }
    return Project.remove(project);
  }
}
