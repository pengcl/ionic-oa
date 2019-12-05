import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {formData} from '../../../../utils/utils';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ReplyService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  add(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'noticeComment/create.action', formData(body));
  }
}
