import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {formData} from '../../../utils/utils';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DeptService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  types(): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeType/myDeptNoticeType.action', formData({}));
  }

  dept(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeInfo/pageListForDepUser.action', formData(body));
  }
}
