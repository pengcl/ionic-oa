import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {formData} from '../../../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(@Inject('PREFIX_URL') private PREFIX_URL,
              private http: HttpClient) {
  }

  list(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'SysOrgselect!getUserJSON.action', formData(body));
  }
}
