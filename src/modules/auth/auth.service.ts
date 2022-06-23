import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/users/entities/user.entity';
import { AccessToken } from './payloads/accessToken.payload';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AccessToken | null> {
    const user: User = await User.findOne({
      where: {
        email,
      },
      relations: {
        tenant: true,
      },
    });
    if (!user) throw new Error('test');
    const passwordValid = await this.checkPassword(
      password,
      user?.password || '',
    );

    if (!user || !passwordValid) {
      throw new UnauthorizedException(
        'Invalid username / password combination',
      );
    }

    return {
      accessToken: this.jwtService.sign({
        userId: user.id,
        role: user.role,
        tenantId: user.tenant.id,
      }),
    };
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
