import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { env } from 'env.config';
import { Response, Request } from 'express';
import { AppContracts } from 'src/app.contracts';
import { EventsAppInternalErrorDto } from 'src/events/dto/app-events.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

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
      this.logger.error(exception);
    }
    // notify dev team if HttpException Status is HttpStatus.INTERNAL_SERVER_ERROR
    if (status === 500) {
      const requestUrl =
        request.protocol + '://' + request.get('host') + request.originalUrl;

      this.eventEmitter.emit(
        AppContracts.events.app.internalError,
        new EventsAppInternalErrorDto({
          appName: env.PROJECT_TITLE,
          appStaging: env.NODE_ENV,
          errorMessage: message,
          method: request.method,
          requestUrl,
          queryParams: Object.keys(request.params).length
            ? JSON.stringify({ ...request.params })
            : undefined,
          payloadData: JSON.stringify(request.body),
          errorStack: exception.stack,
        }),
      );
    }
    response.status(status).json({
      status: false,
      message,
      data: null,
    });
  }
}
