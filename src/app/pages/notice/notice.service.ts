import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {formData} from '../../utils/utils';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class NoticeService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  list(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeUser/pageList.action', formData(body));
  }

  get(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeInfo/get.action', formData({id}));
  }

  dto(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeInfo/dto.action', formData({id}));
  }

  praises(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticePraise/noticePraise.action', formData({noticeInfoId: id}));
  }

  dept(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeInfo/pageListForDepUser.action', formData(body));
  }

  like(id, isLiked?): Observable<any> {
    const action = isLiked ? 'noticeUp/unFavor.action' : 'noticeUp/favor.action';
    return this.http.post(this.PREFIX_URL + action, formData({commentId: id}));
  }
}
