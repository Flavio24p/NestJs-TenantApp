import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: 'enum', enum: TaskStatus })
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty()
  @IsOptional()
  projectId?: string;
}
