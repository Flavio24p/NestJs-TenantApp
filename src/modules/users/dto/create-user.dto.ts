import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'User should have an email' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'User should have a password' })
  password: string;

  @ApiProperty({ type: 'enum', enum: UserRoles })
  @IsString()
  role: UserRoles;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'User should be assigned to a tenant' })
  tenant: string;
}
