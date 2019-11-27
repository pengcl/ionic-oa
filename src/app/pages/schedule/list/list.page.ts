import {Component, Inject, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {TabsService} from '../../../tabs/tabs.service';
import {DownloadService} from '../../../@core/data/download.service';
import {AuthService} from '../../auth/auth.service';
import {ScheduleService} from '../schedule.service';
import {IonInfiniteScroll} from '@ionic/angular';

declare var $: any;

@Component({
  selector: 'app-schedule-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ScheduleListPage {
  token = this.authSvc.token();

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  constructor(private title: Title,
              private route: ActivatedRoute,
              private router: Router,
              private location: LocationStrategy,
              private downloadSvc: DownloadService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private tabsSvc: TabsService,
              private authSvc: AuthService,
              private planSvc: ScheduleService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('我的日程');
    this.tabsSvc.set(true);
  }

  segmentChanged(e) {
  }

}
