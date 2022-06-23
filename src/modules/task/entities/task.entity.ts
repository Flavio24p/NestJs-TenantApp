import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/modules/project/entities/project.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TaskStatus {
  Todo = 'Todo',
  InProgress = 'Inprogress',
  Done = 'Done',
}

@Entity('task')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.Todo })
  status: TaskStatus;

  @ApiProperty({ type: () => Project })
  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @ApiProperty({ type: () => Tenant })
  @ManyToOne(() => Tenant, (tenant) => tenant.tasks)
  tenant: Tenant;

  @ApiProperty()
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
}
