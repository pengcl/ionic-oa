import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {formData} from '../../utils/utils';

@Injectable({providedIn: 'root'})
export class MeetingService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  list(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApply!getOwnList.action', formData(body));
  }

  get(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApply!getById.action', formData({id}));
  }

  accessories(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'WfFile!mobileGetList.action', formData(body));
  }

  accessory(id): Observable<any> {
    return this.http.get(this.PREFIX_URL + 'WfFile!downloadMissiveAttach.action?id=' + id);
  }

  missives(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApplyItem!getTopicMissiveList.action', formData(body));
  }

  sign(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApply!meetingSignFun.action', formData(body));
  }

  start(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApply!startFun.action', formData({id}));
  }

  end(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApply!finishMeetingFun.action', formData({id}));
  }

  pause(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApply!pauseFun.action', formData({id}));
  }

  restart(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApply!restartFun.action', formData({id}));
  }
}
