import {Component, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {TabsService} from '../../../tabs/tabs.service';
import {ToastService} from '../../../@core/data/toast.service';
import {AuthService} from '../../auth/auth.service';
import {MeetingService} from '../meeting.service';
import {IssueService} from '../issue/issue.service';

@Component({
  selector: 'app-meeting-members',
  templateUrl: 'members.page.html',
  styleUrls: ['members.page.scss']
})
export class MeetingMembersPage {
  id = this.route.snapshot.params.id;
  type = this.route.snapshot.queryParams.type;
  token = this.authSvc.token();
  title = this.type === 'attendance' ? '出席人员' : '回避人员';
  items;

  constructor(private route: ActivatedRoute,
              private location: LocationStrategy,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private toastSvc: ToastService,
              private authSvc: AuthService,
              private meetingSvc: MeetingService,
              private issueSvc: IssueService) {
  }

  ionViewDidEnter() {
    this.tabsSvc.set(false);
    if (this.type === 'attendance') {
      this.meetingSvc.get(this.id).subscribe(res => {
        this.getData(res.objDetail);
      });
    } else if (this.type === 'issue') {
      const body = {
        mid: this.id,
        flag: this.token.isMeetingAdmin
      };
      this.issueSvc.list(body).subscribe(res => {
        const items = [];
        res.rows.forEach(item => {
          if (item.subStatus === '2') {
            items.push({
              name: item.subTopic,
              id: item.id,
              checked: false
            });
          }
        });
        console.log(res.rows);
        this.items = items;
      });
    } else {
      this.issueSvc.get(this.id).subscribe(res => {
        this.getData(res.objDetail);
      });
    }
  }

  getData(obj) {
    const items = [];
    const ids = obj.leaderIds.split(',');
    const names = obj.leaderNames.split('、');
    ids.forEach((item, index) => {
      items.push({
        name: names[index],
        id: ids[index],
        checked: (() => {
          if (this.type === 'attendance') {
            return obj.attendIds.split(',').indexOf(ids[index]) !== -1;
          } else {
            return obj.evadeUserIds.split(',').indexOf(ids[index]) !== -1;
          }
        })()
      });
    });
    this.items = items;
  }

  submit() {
    const ids = [];
    this.items.forEach(item => {
      if (item.checked) {
        ids.push(item.id);
      }
    });
    if (this.type === 'attendance') {
      this.meetingSvc.sign({id: this.id, userIds: ids}).subscribe(res => {
        this.toastSvc.show('保存成功', 1000).then(() => {
          this.location.back();
        });
      });
    }
    if (this.type === 'avoid') {
      this.issueSvc.avoid({subId: this.id, userIds: ids}).subscribe(res => {
        this.toastSvc.show('保存成功', 1000).then(() => {
          this.location.back();
        });
      });
    }
  }

  back() {
    this.location.back();
  }

}
