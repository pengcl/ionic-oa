import {Component, Inject, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {NoticeService} from '../notice.service';
import {CommentComponent} from '../components/comment/comment.component';

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
  like = {
    liked: false,
    count: 0
  };
  commentCount = 0;

  @ViewChild('comment', {static: true}) comment: CommentComponent;

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
    this.getData();
  }

  getData() {
    this.noticeSvc.dto(this.id).subscribe(res => {
      console.log(res);
      if (res.hasOwnProperty('noticePictureVoList')) {
        res.noticePictureVoList.forEach(item => {
          item.file = this.PREFIX_URL + 'SysAttachment!download.action?fileNo=' + item.attachId;
        });
      }
      this.data = res;
      this.getPraises();
    });
  }

  getPraises() {
    this.noticeSvc.praises(this.id).subscribe(res => {
      console.log(res);
      this.like.count = res.length;
      res.forEach((item) => {
        if (this.token.userId === item.userId) {
          this.like.liked = true;
          return false;
        }
      });
    });
  }

  countChange(e) {
    this.commentCount = e;
  }

  onReplied(e) {
    this.getData();
    this.comment.getData();
  }

  back() {
    this.location.back();
  }

}
