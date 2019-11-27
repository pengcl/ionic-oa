import {Component, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {ModalController} from '@ionic/angular';
import {IonInfiniteScroll} from '@ionic/angular';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {NoticeService} from '../notice.service';

import {color} from '../../../utils/utils';

@Component({
  selector: 'app-notice-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class NoticeListPage {

  token = this.authSvc.token();
  params = {
    userId: this.token.userInfo.sysUsersId,
    pageSize: 10,
    page: 1
  };
  notices;

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private modalController: ModalController,
              private tabsSvc: TabsService,
              private authSvc: AuthService,
              private noticeSvc: NoticeService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('通知公告');
    this.tabsSvc.set(false);
    this.noticeSvc.list(this.params).subscribe(res => {
      res.rows.forEach(item => {
        item.color = color();
      });
      this.notices = res.rows;
    });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.params.page++;
      this.noticeSvc.list(this.params).subscribe(res => {
        res.rows.forEach(item => {
          item.color = color();
        });
        this.notices = this.notices.concat(res.rows);
        if (this.notices.langth >= res.total) {
          event.target.disabled = true;
        }
      });
    }, 500);
  }
}
