import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message: string | Record<string, string> = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        Object.hasOwn(exceptionResponse as Record<string, unknown>, 'message')
      ) {
        const msg = (exceptionResponse as Record<string, unknown>)['message'];
        if (Array.isArray(msg)) {
          message = msg.join(', ');
        } else {
          message = msg as string;
        }
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      console.log(exception);
    }
    response.status(status).json({
      status: false,
      message,
      data: null,
    });
  }
}
