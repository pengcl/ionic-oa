import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {TabsService} from '../../tabs/tabs.service';
import {StorageService} from '../../@core/utils/storage.service';
import {AuthService} from '../auth/auth.service';
import {MemberService} from './member.service';
import {DialogService} from '../../@core/modules/dialog';

@Component({
  selector: 'app-member',
  templateUrl: './member.page.html',
  styleUrls: ['./member.page.scss']
})
export class MemberPage {
  token = this.authSvc.token();
  params = {
    key: this.token.key,
    page: 1
  };
  data;

  constructor(private router: Router,
              private storageSvc: StorageService,
              private title: Title,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private tabsSvc: TabsService,
              private authSvc: AuthService,
              private memberSvc: MemberService,
              private dialogSvc: DialogService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('会员中心');
    this.tabsSvc.set(true);
  }

}
