import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {NoticeService} from '../notice.service';

@Component({
  selector: 'app-industry-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class NoticeItemPage {
  id = this.route.snapshot.params.id;
  token = this.authSvc.token();
  data;
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 1,
    speed: 400
  };
  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private tabsSvc: TabsService,
              @Inject('PREFIX_URL') public PREFIX_URL,
              private authSvc: AuthService,
              private noticeSvc: NoticeService) {
  }

  ionViewDidEnter() {
    this.tabsSvc.set(false);
    this.noticeSvc.dto(this.id).subscribe(res => {
      res.noticePictureVoList.forEach(item => {
        item.file = this.PREFIX_URL + 'SysAttachment!download.action?fileNo=' + item.attachId;
      });
      this.data = res;
    });
  }

  back() {
    this.location.back();
  }

}
