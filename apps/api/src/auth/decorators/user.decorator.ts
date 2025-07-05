import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthUser } from '../auth.interface';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request & { user?: AuthUser } = ctx
      .switchToHttp()
      .getRequest();
    const { user } = request;
    if (!user) {
      throw new BadRequestException(
        'User not found in request. Authentication required. [ERR_CODE-2111]',
      );
    }
    return user;
  },
);
