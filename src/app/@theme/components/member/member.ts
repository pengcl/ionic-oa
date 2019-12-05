import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ModalController, NavParams} from '@ionic/angular';
import {AuthService} from '../../../pages/auth/auth.service';
import {MemberService} from './member.service';
import {listToTree, getIndex, color} from '../../../utils/utils';

@Component({
  selector: 'app-member',
  templateUrl: 'member.html',
  styleUrls: ['member.scss']
})
export class MemberComponent {
  token = this.authSvc.token();
  industries;
  selectedItems = [];
  items = [];
  form: FormGroup = new FormGroup({});
  params = {
    searchTxt: '',
    page: 1,
    pageSize: 15
  };

  constructor(private modalController: ModalController,
              private navParams: NavParams,
              private authSvc: AuthService,
              private memberSvc: MemberService) {
    this.selectedItems = this.navParams.data.items;
    memberSvc.list(this.params).subscribe(res => {
      this.items = res.rows;
      this.setSelected();
    });
  }

  checked(item) {
    const index = getIndex(this.items, 'id', item.id);
    if (index >= 0) {
      this.items.splice(index, 1);
    } else {
      this.items.push(item);
    }
  }

  getSelected() {
    const selectedItems = [];
    this.items.forEach(item => {
      if (item.checked) {
        selectedItems.push(item);
      }
    });
    this.selectedItems = selectedItems;
  }

  setSelected() {
    this.items.forEach(item => {
      const index = getIndex(this.selectedItems, 'userid', item.userid);
      if (index >= 0) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
  }

  remove(item): void {
    const index = getIndex(this.selectedItems, 'userid', item.userid);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
    this.setSelected();
  }

  cancel() {
    this.modalController.dismiss(this.selectedItems).then();
  }

  confirm() {
    this.modalController.dismiss(this.selectedItems).then();
  }

  loadData(event) {
    setTimeout(() => {
      event.target.complete();
      this.params.page++;
      this.memberSvc.list(this.params).subscribe(res => {
        res.rows.forEach(item => {
          item.selected = false;
        });
        this.items = this.items.concat(res.rows);
        if (this.items.length >= res.total) {
          event.target.disabled = true;
        }
      });
    }, 500);
  }

}
