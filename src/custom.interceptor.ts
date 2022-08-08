import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Request intercept');
    return handler.handle().pipe(
      map((data) => {
        const response = {
          ...data,
          createAt: data.created_at,
        };
        delete response.updated_at;
        delete response.created_at;

        return response;
      }),
    );
  }
}
