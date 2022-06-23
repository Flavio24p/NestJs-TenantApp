import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';

export enum UserRoles {
  Normal = 'normal',
  Admin = 'admin',
}

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.Normal,
  })
  role: UserRoles;

  @BeforeInsert()
  async hashPassword() {
    const hash: string = await bcrypt.hash(this.password, 9);
    this.password = hash;
  }

  @ManyToOne(() => Tenant, (tenant) => tenant.users)
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
