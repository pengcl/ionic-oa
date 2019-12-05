import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {TabsService} from '../../../tabs/tabs.service';
import {DialogService} from '../../../@core/modules/dialog';
import {ToastService} from '../../../@core/data/toast.service';
import {AuthService} from '../../auth/auth.service';
import {MeetingService} from '../meeting.service';
import {IssueService} from '../issue/issue.service';

@Component({
  selector: 'app-meeting-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class MeetingItemPage {
  id = this.route.snapshot.params.id;
  token = this.authSvc.token();
  data;
  issues;

  timer = {
    h: '00',
    m: '00',
    s: '00'
  };

// status '1':待上会-WAIT_MEET|'2':进行中-RUNNING_MEET|'3':已结束-END_MEET|'9':已暂停-PAUSE_MEET
  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private dialogSvc: DialogService,
              private toastSvc: ToastService,
              private authSvc: AuthService,
              private meetingSvc: MeetingService,
              private issueSvc: IssueService) {
  }

  ionViewDidEnter() {
    this.tabsSvc.set(false);
    this.getData();
  }

  getData() {
    this.meetingSvc.get(this.id).subscribe(res => {
      this.data = res.objDetail;
      console.log(this.data.status);
    });
    this.getIssues();
  }

  getIssues() {
    const body = {
      mid: this.id,
      flag: this.token.isMeetingAdmin
    };
    this.issueSvc.list(body).subscribe(res => {
      this.issues = res.rows;
    });
  }

  start() {
    this.dialogSvc.show({title: '议题提醒', content: '是否开始会议？', cancel: '否', confirm: '是'}).subscribe(state => {
      if (state.value) {
        this.meetingSvc.start(this.id).subscribe(res => {
          this.toastSvc.show('会议开始', 1000).then();
          this.getData();
        });
      }
    });
  }

  end() {
    this.dialogSvc.show({title: '议题提醒', content: '是否结束会议？', cancel: '否', confirm: '是'}).subscribe(state => {
      if (state.value) {
        this.meetingSvc.end(this.id).subscribe(res => {
          this.toastSvc.show('会议已结束', 1000).then();
          this.getData();
        });
      }
    });
  }

  pause() {
    this.dialogSvc.show({title: '议题提醒', content: '是否暂停会议？', cancel: '否', confirm: '是'}).subscribe(state => {
      if (state.value) {
        this.meetingSvc.pause(this.id).subscribe(res => {
          this.toastSvc.show('会议已暂停', 1000).then();
          this.getData();
        });
      }
    });
  }

  restart() {
    this.dialogSvc.show({title: '议题提醒', content: '是否继续会议？', cancel: '否', confirm: '是'}).subscribe(state => {
      if (state.value) {
        this.meetingSvc.restart(this.id).subscribe(res => {
          this.toastSvc.show('继续会议', 1000).then();
          this.getData();
        });
      }
    });
  }

  back() {
    this.location.back();
  }

}
