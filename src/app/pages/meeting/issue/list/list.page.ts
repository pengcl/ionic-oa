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
  selector: 'app-meeting-issue-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class MeetingIssueListPage {
  id = this.route.snapshot.params.id;
  token = this.authSvc.token();
  data;
  orderNo = 1;

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
  }

  getData() {
    const body = {
      mid: this.id,
      flag: this.token.isMeetingAdmin
    };
    this.issueSvc.list(body).subscribe(res => {
      const items = [];
      res.rows.forEach(item => {
        if (item.subStatus === '2') {
          items.push(item);
          this.orderNo = this.orderNo + 1;
        }
      });
      this.data = items;
    });
  }

  order(subId, flag) {
    console.log(flag);
    this.issueSvc.order({flag, subId}).subscribe(res => {
      this.getData();
    });
  }

  delete(id) {
    this.dialogSvc.show({title: '议题提醒', content: '是否删除该议题？', cancel: '否', confirm: '是'}).subscribe(state => {
      if (state.value) {
        this.issueSvc.delete(id).subscribe(res => {
          this.toastSvc.show(res.message, 1000).then();
          this.getData();
        });
      }
    });
  }

}
