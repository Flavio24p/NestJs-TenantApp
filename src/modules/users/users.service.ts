import { ForbiddenException, Injectable } from '@nestjs/common';
import { Tenant } from '../tenant/entities/tenant.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { TokenInterface } from './dto/token.interface';
import { User, UserRoles } from './entities/user.entity';

@Injectable()
export class UsersService {
  async findOne(email: string): Promise<User | undefined> {
    return User.findOneBy({ email });
  }

  async create(
    createUser: CreateUserDto,
    reqUser: TokenInterface,
  ): Promise<User> {
    if (reqUser.role !== UserRoles.Admin)
      throw new ForbiddenException('Only admin can create a new user');
    const user = new User();
    user.email = createUser.email;
    user.password = createUser.password;
    user.role = createUser.role;
    user.tenant = await Tenant.findOneByOrFail({
      companyName: createUser.tenant,
    });
    return User.save(user);
  }
}
