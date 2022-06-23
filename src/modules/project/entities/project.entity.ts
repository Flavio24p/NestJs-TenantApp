import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/modules/task/entities/task.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('project')
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ type: () => Task })
  @OneToMany(() => Task, (tasks) => tasks.project, {
    eager: true,
  })
  tasks: Task[];

  @ApiProperty({ type: () => Tenant })
  @ManyToOne(() => Tenant, (tenant) => tenant.projects)
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
