import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';

import {StorageService} from '../../@core/utils/storage.service';

import {formData} from '../../utils/utils';

@Injectable({providedIn: 'root'})
export class AuthService {
  public loginRedirectUrl: string;
  private loginStatus = new Subject<boolean>();

  constructor(@Inject('PREFIX_URL') private PREFIX_URL,
              private http: HttpClient,
              private router: Router,
              private storage: StorageService) {
  }

  requestAuth() {
    if (this.router.url.indexOf('auth') !== -1) {
      return false;
    }
    if (this.loginRedirectUrl) {
      return false;
    }

    this.loginRedirectUrl = this.router.url;
    this.router.navigate(['/pages/auth']);
  }

  login(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'SysUsers!login.action', formData(body));
  }

  token(token?) {
    if (token) {
      this.storage.set('token', JSON.stringify(token));
    } else if (token === null) {
      this.storage.remove('token');
    } else {
      const TOKEN = this.storage.get('token');
      if (TOKEN) {
        return JSON.parse(TOKEN);
      } else {
        return '';
      }
    }
  }

  get currentUser() {
    const token = this.storage.get('token');
    return JSON.parse(token);
  }

  get isLogged(): boolean {
    this.loginStatus.next(!!this.currentUser);
    return !!this.currentUser;
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  updateLoginStatus(token) {
    this.storage.set('token', JSON.stringify(token));
    this.loginStatus.next(this.isLogged);
  }
}
