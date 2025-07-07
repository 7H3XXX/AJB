import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthRole, AuthUser } from '../auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request & { user?: AuthUser; roles?: AuthRole[] } = context
      .switchToHttp()
      .getRequest();
    const authorization = request.headers.authorization; //? 'Bearer <token>'
    const token = authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException(
        'Authorization token not found in request headers.',
      );
    }
    try {
      // Retrieve user data and roles
      const { sub }: { sub: string } = await this.jwtService.verifyAsync(token);
      const user = await this.userService.findById(sub);
      const roles = await this.userService.getRolesByUserId(sub);
      if (!user) {
        throw new UnauthorizedException(
          'Authenticated user not found. Please ensure your account exists and try again.',
        );
      }
      request.user = user as AuthUser;
      request.roles = (roles || []) as AuthRole[];
      return true;
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(
          'JWT token has expired. Please log in again.',
        );
      }
      throw new UnauthorizedException('Invalid or malformed JWT token.');
    }
  }
}
