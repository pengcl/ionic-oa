import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-industry-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class MeetingItemPage {
  id = this.route.snapshot.params.id;
  token = this.authSvc.token();

  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private authSvc: AuthService) {
  }

  ionViewDidEnter() {
    this.tabsSvc.set(false);
  }

  back() {
    this.location.back();
  }

}
