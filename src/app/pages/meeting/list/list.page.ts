import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {ModalController} from '@ionic/angular';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {MeetingService} from '../meeting.service';

@Component({
  selector: 'app-meeting-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class MeetingListPage {

  token = this.authSvc.token();
  params = {
    type: 'n',
    pageSize: 10,
    flag: this.token.meetingAdmin,
    page: 1,
    topic: ''
  };
  meetings;

  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private modalController: ModalController,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private authSvc: AuthService,
              private meetingSvc: MeetingService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('我的会议');
    this.tabsSvc.set(true);
    this.getData();
  }

  segmentChanged(e) {
    this.params.type = e.detail.value;
    this.params.page = 1;
    this.getData();
  }

  getData() {
    this.meetingSvc.list(this.params).subscribe(res => {
      this.meetings = res.rows;
    });
  }

}
