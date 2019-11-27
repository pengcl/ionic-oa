import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {ModalController} from '@ionic/angular';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-notice-dept',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class NoticeDeptPage {

  token = this.authSvc.token();

  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private modalController: ModalController,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private authSvc: AuthService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('我的会议');
    this.tabsSvc.set(true);
  }

}
