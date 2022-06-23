import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Project } from 'src/modules/project/entities/project.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { Tenant } from 'src/modules/tenant/entities/tenant.entity';
import { User } from 'src/modules/users/entities/user.entity';
// import { join } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.PG_DATABASE_HOST,
  port: parseInt(process.env.PG_DATABASE_PORT, 10),
  username: process.env.PG_DATABASE_USERNAME,
  password: process.env.PG_DATABASE_PASSWORD,
  database: process.env.PG_DATABASE_NAME,
  // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  entities: [User, Tenant, Task, Project],
  synchronize: false,
};
