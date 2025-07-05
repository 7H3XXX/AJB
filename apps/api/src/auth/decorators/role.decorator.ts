import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthRole } from '../auth.interface';

export const GetRoles = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request & { roles?: AuthRole[] } = ctx
      .switchToHttp()
      .getRequest();
    const { roles } = request;
    if (!roles) {
      throw new BadRequestException(
        'Missing user roles in request. Authentication required. [ERR_CODE-2112]',
      );
    }
    return roles;
  },
);
