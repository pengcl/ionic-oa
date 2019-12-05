import {Component, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationStrategy} from '@angular/common';
import {TabsService} from '../../../../tabs/tabs.service';
import {LoadingService} from '../../../../@core/data/loading.service';
import {ToastService} from '../../../../@core/data/toast.service';
import {DialogService} from '../../../../@core/modules/dialog';
import {FileService} from '../../../../@core/data/cache.service';
import {AuthService} from '../../../auth/auth.service';
import {MeetingService} from '../../meeting.service';
import {IssueService} from '../issue.service';
import {interval as observableInterval} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {MemberComponent} from '../../../../@theme/components/member/member';
import {getIndex} from '../../../../utils/utils';

@Component({
  selector: 'app-meeting-issue-edit',
  templateUrl: 'edit.page.html',
  styleUrls: ['edit.page.scss']
})
export class MeetingIssueEditPage {
  id = this.route.snapshot.params.id;
  selectedItems = [];
  form: FormGroup = new FormGroup({
    mid: new FormControl('', [Validators.required]),
    subId: new FormControl(this.id, []),
    subTopic: new FormControl('', [Validators.required]),
    subOrd: new FormControl(1, [Validators.required]),
    subStatus: new FormControl(2, [Validators.required]),
    subHours: new FormControl(0, [Validators.required]),
    subSeconds: new FormControl(15, [Validators.required]),
    subMemo: new FormControl('', []),
    missiveIds: new FormControl('', []),
    subHostNames: new FormControl([], [Validators.required]),
    subHostIds: new FormControl([], [Validators.required]),
    subPartNames: new FormControl([], [Validators.required]),
    subPartIds: new FormControl([], [Validators.required])
  });

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: LocationStrategy,
              private tabsSvc: TabsService,
              @Inject('FILE_PREFIX_URL') public FILE_PREFIX_URL,
              private modalController: ModalController,
              private fileSvc: FileService,
              private loadingSvc: LoadingService,
              private toastSvc: ToastService,
              private dialogSvc: DialogService,
              private authSvc: AuthService,
              private meetingSvc: MeetingService,
              private issueSvc: IssueService) {
  }

  ionViewDidEnter() {
    this.tabsSvc.set(false);
    this.issueSvc.get(this.id).subscribe(res => {
      const data = res.objDetail;
      for (const key in this.form.value) {
        if (key === 'subHostNames' || key === 'subHostIds' || key === 'subPartNames' || key === 'subPartIds') {
          this.form.get(key).setValue(data[key].split(','));
        } else {
          this.form.get(key).setValue(data[key]);
        }
      }
    });
  }

  async presentModal(target) {
    const modal = await this.modalController.create({
      showBackdrop: true,
      component: MemberComponent,
      componentProps: {items: this.selectedItems}
    });
    await modal.present();
    const {data} = await modal.onDidDismiss(); // 获取关闭传回的值
    this.form.get(target + 'Ids').markAsTouched();
    this.form.get(target + 'Names').markAsTouched();
    const ids = [];
    const names = [];
    data.forEach(item => {
      ids.push(item.userid);
      names.push(item.username);
    });
    this.form.get(target + 'Ids').setValue(ids);
    this.form.get(target + 'Names').setValue(names);
    console.log(this.form.get(target + 'Ids').value);
  }

  remove(item): void {
    const index = getIndex(this.selectedItems, 'id', item.id);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }

  submit() {
    if (this.form.invalid) {
      return false;
    }
    this.loadingSvc.show('提交中...', 0).then();
    this.issueSvc.save(this.form.value).subscribe(res => {
      this.loadingSvc.hide();
      this.dialogSvc.show({content: '修改议题成功', cancel: '', confirm: '我知道了'}).subscribe(() => {
        this.location.back();
      });
    });
  }

}
