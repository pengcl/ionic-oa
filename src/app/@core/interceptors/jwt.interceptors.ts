import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../pages/auth/auth.service';

@Injectable()
export class JwtInterceptors implements HttpInterceptor {
  constructor(private authSvc: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const JWT = `Bearer TOKEN`;
    req = req.clone({
      setHeaders: {
        token: this.authSvc.token() ? this.authSvc.token().token : ''
      }
    });
    return next.handle(req);
  }

}
