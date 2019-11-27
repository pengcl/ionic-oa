import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';

import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
/*import {DialogService} from '../data/dialog.service';*/
import {DialogService} from '../modules/dialog';
import {AlertController} from '@ionic/angular';
import {AuthService} from '../../pages/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private alert: AlertController, private dialogSvc: DialogService, private authSvc: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(tap(
      res => this.handleResponse(res),
      err => this.handleResponse(err)
    ));
  }

  private handleResponse(res: any): void {
    if (res.body) {
      if (res.body.code) {
        if (res.body.code === '-1') {
          this.authSvc.requestAuth();
        } else {
          this.dialogSvc.show({
            content: res.body.msg ? res.body.msg : res.body.message,
            cancel: '我知道了'
          }).subscribe();
        }
      }
    }
  }
}
