import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Tenant } from './entities/tenant.entity';

@Controller('tenant')
@ApiBearerAuth('authorization')
@UseGuards(JwtAuthGuard)
@ApiTags('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  @ApiBody({ type: CreateTenantDto })
  @ApiResponse({
    status: 201,
    description: 'Creates a new tenant',
    type: Tenant,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Creates a new tenant',
    type: Tenant,
    isArray: true,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Creates a new tenant',
    type: Tenant,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: CreateTenantDto })
  @ApiResponse({
    status: 200,
    description: 'Update a tenant',
    type: Tenant,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(+id, updateTenantDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Deleted a tenant',
    type: Tenant,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.tenantService.remove(+id);
  }
}
