import {Component} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ModalController} from '@ionic/angular';
import {TabsService} from '../../tabs/tabs.service';
import {PickerService} from '../../@core/modules/picker';
import {AuthService} from '../auth/auth.service';
import {NoticeService} from '../notice/notice.service';
import {MeetingService} from '../meeting/meeting.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  token = this.authSvc.token();
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 400
  };
  notices;
  deptNotices;
  meetings;
  params = {
    userId: this.token.userInfo.sysUsersId,
    limit: 5
  };
  colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'];

  constructor(private title: Title,
              private modalController: ModalController,
              private tabsSvc: TabsService,
              private pickerSvc: PickerService,
              private authSvc: AuthService,
              private noticeSvc: NoticeService,
              private meetingSvc: MeetingService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('广视通');
    this.tabsSvc.set(true);
    this.getNotices();
    this.getMeetings();
  }

  color() {
    const index = Math.floor(this.colors.length * Math.random());
    return this.colors[index];
  }

  getNotices() {
    this.noticeSvc.list(this.params).subscribe(res => {
      res.rows.forEach(item => {
        item.color = this.color();
      });
      this.notices = res.rows.slice(0, 5);
      console.log(this.notices);
    });
    this.noticeSvc.dept({}).subscribe(res => {
      res.rows.forEach(item => {
        item.color = this.color();
      });
      this.deptNotices = res.rows.slice(0, 5);
    });
  }

  getMeetings() {
    this.meetingSvc.list({type: 'np', flag: 'n'}).subscribe(res => {
      this.meetings = res.rows.slice(0, 5);
      console.log(this.meetings);
    });
  }
}
