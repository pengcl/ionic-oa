import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {ModalController} from '@ionic/angular';
import {PickerService} from '../../../@core/modules/picker';
import {TabsService} from '../../../tabs/tabs.service';
import {AuthService} from '../../auth/auth.service';
import {NoticeService} from '../notice.service';
import {DeptService} from './dept.service';
import {color} from '../../../utils/utils';

@Component({
  selector: 'app-notice-dept',
  templateUrl: 'dept.page.html',
  styleUrls: ['dept.page.scss']
})
export class NoticeDeptPage {
  token = this.authSvc.token();
  types = [];
  notices;

  params = {
    pageSize: 10,
    page: 1,
    noticeId: ''
  };

  dept = {label: '全部', value: ''};

  constructor(private title: Title,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private modalController: ModalController,
              private pickerSvc: PickerService,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private authSvc: AuthService,
              private noticeSvc: NoticeService,
              private deptSvc: DeptService) {
  }

  ionViewDidEnter() {
    this.title.setTitle('我的会议');
    this.tabsSvc.set(true);
    this.deptSvc.types().subscribe(res => {
      console.log(res);
      const types = [
        {
          label: '全部',
          value: ''
        }
      ];
      res.forEach(item => {
        types.push({label: item.text, value: item.id});
      });
      this.types = types;
    });
    this.getData();
  }

  getData() {
    this.deptSvc.dept(this.params).subscribe(res => {
      res.rows.forEach(item => {
        item.color = color();
      });
      this.notices = res.rows;
      console.log(this.notices);
    });
  }

  showPicker() {
    this.pickerSvc.show([this.types]).subscribe(res => {
      this.dept = res.items[0];
      this.params.noticeId = this.dept.value;
      this.getData();
    });
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.params.page++;
      this.deptSvc.dept(this.params).subscribe(res => {
        res.rows.forEach(item => {
          item.color = color();
        });
        this.notices = this.notices.concat(res.rows);
        if (this.notices.length >= res.total) {
          event.target.disabled = true;
        }
      });
    }, 500);
  }

}
