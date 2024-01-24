import { HttpStatus } from '@/common/constants';
import { ApiResponse } from '@/common/helpers/response';
import {
    CallHandler,
    ExecutionContext,
    HttpStatus as BaseHttpStatus,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<unknown>,
    ): Observable<unknown> {
        return next.handle().pipe(
            map((data: ApiResponse<unknown>) => {
                // set http status for response
                const httpCode = Object.values({
                    ...BaseHttpStatus,
                    ...HttpStatus,
                }).includes(data?.code)
                    ? data?.code
                    : null;
                if (httpCode) {
                    context.switchToHttp().getResponse().status(httpCode);
                }
                return data;
            }),
        );
    }
}
