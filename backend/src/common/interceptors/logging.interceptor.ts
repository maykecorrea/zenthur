import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const userId = req.user?.userId || 'anônimo';

    const now = Date.now();

    this.logger.log(
      `[${method}] ${originalUrl} - ${userId} - ${ip} - ${userAgent}`
    );

    return next.handle().pipe(
      tap({
        next: (val) => {
          const response = context.switchToHttp().getResponse();
          const delay = Date.now() - now;
          
          this.logger.log(
            `[${method}] ${originalUrl} - ${userId} - ${delay}ms - ${response.statusCode}`
          );
        },
        error: (err) => {
          const response = context.switchToHttp().getResponse();
          const delay = Date.now() - now;
          
          this.logger.error(
            `[${method}] ${originalUrl} - ${userId} - ${delay}ms - ${response.statusCode || 500} - ${err.message}`,
            err.stack,
          );
        }
      })
    );
  }
}