import {Component, ViewChild, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {PickerService} from '../../../@core/modules/picker';

@Component({
  selector: 'app-document-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class DocumentListPage {
  token = this.authSvc.token();
  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  constructor(private title: Title,
              private modalController: ModalController,
              private tabsSvc: TabsService,
              private pickerSvc: PickerService,
              private authSvc: AuthService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('我的公文');
    this.tabsSvc.set(true);
  }

  segmentChanged(e) {
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
