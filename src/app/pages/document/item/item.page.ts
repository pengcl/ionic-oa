import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {DocumentService} from '../document.service';

@Component({
  selector: 'app-document-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss']
})
export class DocumentItemPage {
  token = this.authSvc.token();

  constructor(private title: Title,
              private route: ActivatedRoute,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private authSvc: AuthService) {
  }

  ionViewDidEnter() {
    this.tabsSvc.set(false);
  }

}
