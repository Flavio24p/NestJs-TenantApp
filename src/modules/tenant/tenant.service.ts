import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenantService {
  create(createTenantDto: CreateTenantDto) {
    const tenant: Tenant = new Tenant();
    tenant.companyName = createTenantDto.companyName;
    return Tenant.save(tenant);
  }

  findAll() {
    return Tenant.find();
  }

  findOne(id: number) {
    return Tenant.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTenantDto: UpdateTenantDto) {
    const tenant: Tenant = await Tenant.findOneOrFail({
      where: {
        id,
      },
    });
    if (updateTenantDto.companyName)
      tenant.companyName = updateTenantDto.companyName;
    return Tenant.save(tenant);
  }

  async remove(id: number) {
    const tenant: Tenant = await Tenant.findOne({
      where: {
        id,
      },
      relations: {
        users: true,
      },
    });
    if (!tenant) {
      throw new NotFoundException('Tenant doesnt exists');
    }
    if (tenant.users) {
      throw new ForbiddenException('Tenant has users and cannot be deleted');
    }
    return Tenant.remove(tenant);
  }
}
