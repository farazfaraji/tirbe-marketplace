import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PinoLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestId: string = uuid();
    this.logger.assign({ requestId });
    return next.handle();
  }
}
