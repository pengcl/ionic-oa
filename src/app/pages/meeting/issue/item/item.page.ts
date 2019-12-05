import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {TabsService} from '../../../../tabs/tabs.service';
import {LoadingService} from '../../../../@core/data/loading.service';
import {ToastService} from '../../../../@core/data/toast.service';
import {DialogService} from '../../../../@core/modules/dialog';
import {FileService} from '../../../../@core/data/cache.service';
import {AuthService} from '../../../auth/auth.service';
import {MeetingService} from '../../meeting.service';
import {IssueService} from '../issue.service';
import {interval as observableInterval} from 'rxjs';

@Component({
  selector: 'app-meeting-issue-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class MeetingIssueItemPage {
  id = this.route.snapshot.params.id;
  token = this.authSvc.token();
  data;
  accessories;
  missives;
  timer = {
    h: '00',
    m: '00',
    s: '00'
  };

  interval;

// status '1':草稿-DRAFT_ISSUE|'2':未开始-WAIT_ISSUE|'3':进行中-RUNNING_ISSUE|'4':已结束-END_ISSUE|'9':暂停中-PAUSE_ISSUE
  constructor(private title: Title,
              private route: ActivatedRoute,
              private router: Router,
              private location: LocationStrategy,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private fileSvc: FileService,
              private loadingSvc: LoadingService,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private authSvc: AuthService,
              private meetingSvc: MeetingService,
              private issueSvc: IssueService) {
  }

  ionViewDidEnter() {
    this.tabsSvc.set(false);
    this.getData();
    this.startInterval();
    this.getAccessories();
    this.getMissives();
  }

  startInterval() {
    this.interval = observableInterval(1000).subscribe(res => {
      this.getData();
    });
  }

  endInterval() {
    if (this.interval) {
      this.interval.unsubscribe();
    }
  }

  ionViewDidLeave() {
    this.endInterval();
  }

  getData() {
    this.issueSvc.get(this.id).subscribe(res => {
      this.data = res.objDetail;
      this.getTimer();
    });
  }

  getAccessories() {
    this.meetingSvc.accessories({
      searchTableId: this.id,
      tableName: 'MeetingItem'
    }).subscribe(res => {
      res.rows.forEach(item => {
        item.path = '_downloads/accessories/' + item.id + '.' + item.fileExt;
      });
      this.accessories = res.rows;
    });
  }

  getTimer() {
    const h = Math.floor(this.data.subTotalTime / (60 * 60));
    this.timer.h = this.getTime(h);
    const m = Math.floor((this.data.subTotalTime - h * (60 * 60)) / 60);
    this.timer.m = this.getTime(m);
    const s = this.data.subTotalTime - h * 60 * 60 - m * 60;
    this.timer.s = this.getTime(s);
  }

  getTime(t) {
    return t < 10 ? '0' + t : t;
  }

  preview(id) {
    this.fileSvc.get(id).subscribe(res => {
      const blobURL = window['webkitURL'].createObjectURL(res);
      window.open(blobURL);
    });
  }

  getMissives() {
    this.meetingSvc.missives({subId: this.id}).subscribe(res => {
      this.missives = res.rows;
    });
  }

  start() {
    this.dialogSvc.show({title: '议题提醒', content: '是否开始议题？', cancel: '否', confirm: '是'}).subscribe(state => {
      if (state.value) {
        this.issueSvc.start(this.id).subscribe(res => {
          this.toastSvc.show('议题开始', 1000).then();
          this.getData();
        });
      }
    });
  }

  end() {
    this.dialogSvc.show({title: '议题提醒', content: '是否结束议题？', cancel: '否', confirm: '是'}).subscribe(state => {
      if (state.value) {
        this.issueSvc.end(this.id).subscribe(res => {
          this.toastSvc.show('议题结束', 1000).then(() => {
            this.location.back();
          });
        });
      }
    });
  }

  pause() {
    this.dialogSvc.show({title: '议题提醒', content: '是否暂停会议？', cancel: '否', confirm: '是'}).subscribe(state => {
      if (state.value) {
        this.issueSvc.pause(this.data.mid).subscribe(res => {
          this.getData();
          this.toastSvc.show('议题已暂停', 1000).then(() => {
            this.getData();
          });
        });
      }
    });
  }

  restart() {
    this.dialogSvc.show({title: '议题提醒', content: '是否继续会议？', cancel: '否', confirm: '是'}).subscribe(state => {
      if (state.value) {
        this.issueSvc.restart(this.data.mid).subscribe(res => {
          this.toastSvc.show('会议已继续', 1000).then();
          this.getData();
        });
      }
    });
  }

  sponsor(flag) {
    this.dialogSvc.show({title: '议题提醒', content: '是否' + (flag === 's' ? '发起' : '取消') + '表决？', cancel: '否', confirm: '是'})
      .subscribe(state => {
        if (state.value) {
          this.issueSvc.sponsor({subId: this.id, flag}).subscribe(res => {
            this.toastSvc.show('表决已' + (flag === 's' ? '开始' : '取消'), 1000).then();
          });
        }
      });
  }

  vote() {
    this.dialogSvc.show({title: '议题提醒', content: '是否发起表决？', cancel: '否', confirm: '是'}).subscribe(state => {
      if (state.value) {
        this.issueSvc.vote(this.id).subscribe(res => {
          console.log(res);
        });
      }
    });
  }

  avoid(disabled, e) {
    e.stopPropagation();
    e.preventDefault();
    if (disabled) {
      return false;
    }
    this.router.navigate(['/pages/meeting/members', this.id], {queryParams: {type: 'avoid'}});
  }

  startMeeting() {
  }

  submit() {
  }

}
