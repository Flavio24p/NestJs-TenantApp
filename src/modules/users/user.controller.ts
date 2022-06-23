import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { ReqUser } from '../../commons/decorators/user.decorator';
import { TokenInterface } from './dto/token.interface';
import { JwtAuthGuard } from 'src/commons/guards/jwt-auth.guard';

@Controller('user')
@ApiBearerAuth('authorization')
@UseGuards(JwtAuthGuard)
@ApiTags('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @HttpCode(200)
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Creates a new user',
    type: User,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(
    @Body() createUser: CreateUserDto,
    @ReqUser() reqUser: TokenInterface,
  ) {
    return this.userService.create(createUser, reqUser);
  }
}
