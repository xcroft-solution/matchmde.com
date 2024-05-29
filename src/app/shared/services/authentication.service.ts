import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let hideLoader = req.params.get('hideLoader');
    // if (hideLoader == 'true') {
    //   this.globalStateService.loaderSubject.next(false);
    // } else {
    //   this.globalStateService.loaderSubject.next(true);
    // }

    let accessToken = localStorage.getItem('captchaAccessToken');
    return this.processRequestWithToken(accessToken as any, req, next).pipe(
      finalize(() => {
        // this.globalStateService.loaderSubject.next(false);
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';

        if (error.error instanceof ErrorEvent) {
          console.log('CLIENT Side Error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = `Error Code: ${error.status},  Message: ${error.message
            }, Possible Reason: ${(error.error && error.error['Error']) || 'Unknown'
            }`;
          if (error.status === 401 && !!accessToken ) {
            // Logout Existing User
            
          }
        }

        return throwError(errorMsg);
      })
    );
  }

  private processRequestWithToken(
    token: string,
    req: HttpRequest<any>,
    next: HttpHandler
  ) {
     
    if (req.url.includes(environment.api_url)) {
      if(!!token){
        req = req.clone({
          setHeaders: {
            Authorization: `${token}`,
            'ngsw-bypass': ''
          },
        });
      }
      else{
        req = req.clone({
          setHeaders: {
            'ngsw-bypass': ''
          },
        });
      }
      
    }

    return next.handle(req);
  }
}
