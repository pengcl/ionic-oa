import {Injectable, Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {formData, formDataToUrl} from '../../../utils/utils';

@Injectable({providedIn: 'root'})
export class IssueService {
  constructor(@Inject('PREFIX_URL') private PREFIX_URL, private http: HttpClient) {
  }

  list(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApplyItem!getOwnList.action', formData(body));
  }

  get(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApplyItem!getById.action', formData({id}));
  }

  order(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApplyItem!changeItemOrd.action', formData(body));
  }

  save(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApplyItem!saveOrUpdate.action', formData(body));
  }

  delete(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApplyItem!unbindItem.action', formData({ids: id}));
  }

  start(subId): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApplyItem!startSubTopicFun.action', formData({subId}));
  }

  end(subId): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApplyItem!finishSubTopicFun.action', formData({subId}));
  }

  pause(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApply!pauseFun.action', formData({id}));
  }

  restart(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApply!restartFun.action', formData({id}));
  }

  sponsor(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApplyItem!voteFun.action', formData(body));
  }

  vote(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApplyItem!saveFeedback', formData({id}));
  }

  avoid(body): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApplyItem!saveFeedback', formData(body));
  }

  runningInfo(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApply!getCurSubTopic.action', formData({id}));
  }

  next(id): Observable<any> {
    return this.http.post(this.PREFIX_URL + 'MeetingApplyItem!startNextSubTopicFun.action', formData({id}));
  }
}
