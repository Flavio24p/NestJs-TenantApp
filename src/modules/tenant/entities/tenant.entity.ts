import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/modules/project/entities/project.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tenant')
export class Tenant extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  companyName: string;

  @ApiProperty({ type: () => User })
  @OneToMany(() => User, (user) => user.tenant)
  users: User[];

  @ApiProperty({ type: () => Project })
  @OneToMany(() => Project, (project) => project.tenant)
  projects: Project[];

  @ApiProperty({ type: () => Task })
  @OneToMany(() => Task, (task) => task.tenant)
  tasks: Task[];

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
