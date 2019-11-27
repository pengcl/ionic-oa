import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MeetingService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  list(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApply!getOwnList.action', body);
  }

  get(key, id): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'MeetingApply!getById.action' + '&key=' + key + '&id=' + id);
  }
}
