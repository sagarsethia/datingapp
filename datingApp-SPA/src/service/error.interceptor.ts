import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/Operators';
import { throwError } from 'rxjs';

@Injectable()
export class Errorinterceptor implements HttpInterceptor {
    intercept(req: import('@angular/common/http').HttpRequest<any>, next:
        import('@angular/common/http').HttpHandler):
        import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
        return next.handle(req).pipe(catchError(error => {
            if (error.status === 401) {
                return throwError(error.statusText);
            }
            if (error instanceof HttpErrorResponse) {
                const applicationError = error.headers.get('Application-Error');
                if (applicationError) {
                    throwError(applicationError);
                }
                const serverError = error.error;
                let modelStateError = '';
                if (serverError.errors && typeof serverError.errors === 'object') {
                    for (const key in serverError.errors) {
                        if (serverError.errors[key]) {
                            modelStateError += serverError.errors[key] + '\n';
                        }
                    }
                }
                return throwError(modelStateError || serverError || 'ServerError');
            }
        }));
    }
}
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: Errorinterceptor,
    multi: true
}