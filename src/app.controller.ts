import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AccessToken } from './modules/auth/payloads/accessToken.payload';
import { LoginPayload } from './modules/auth/payloads/auth.payload';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './commons/guards/jwt-auth.guard';

@Controller()
@ApiTags('Hello World')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get('hello-world')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: AccessToken,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async login(@Body() { email, password }: LoginPayload) {
    return this.authService.validateUser(email, password);
  }

  @ApiBearerAuth('authorization')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
