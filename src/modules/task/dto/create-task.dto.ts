import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Task should have a name' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Project should have a description' })
  description: string;

  @ApiProperty({ type: 'enum', enum: TaskStatus })
  @IsString()
  status: TaskStatus;

  @ApiProperty()
  @IsString()
  projectId: string;
}
