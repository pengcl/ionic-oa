import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {formData} from '../../utils/utils';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class NoticeService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  list(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeUser/pageList', formData(body));
  }

  get(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeInfo/get.action', formData({id}));
  }

  dto(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeInfo/dto.action', formData({id}));
  }

  dept(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeInfo/pageListForDepUser', formData(body));
  }
}
