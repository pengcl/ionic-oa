import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {formData} from '../../../../utils/utils';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class CommentService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  list(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeComment/byNoticeInfoId.action', formData(body));
  }

  get(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeInfo/get.action', formData({id}));
  }

  liked(noticeInfoId): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeUp/myFavorNoticeComment.action', formData({noticeInfoId}));
  }
}
