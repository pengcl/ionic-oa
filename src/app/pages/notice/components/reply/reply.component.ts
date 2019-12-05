import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../auth/auth.service';
import {ReplyService} from './reply.service';

@Component({
  selector: 'app-reply',
  templateUrl: 'reply.component.html',
  styleUrls: ['reply.component.scss']
})
export class ReplyComponent implements OnInit {
  @Input() pid = '-1';
  @Input() noticeInfoId;
  @Output() replied = new EventEmitter<any>();
  token = this.authSvc.token();
  form: FormGroup;

  constructor(private authSvc: AuthService, private replySvc: ReplyService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      pid: new FormControl(this.pid, [Validators.required]),
      noticeInfoId: new FormControl(this.noticeInfoId, [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
  }

  reply() {
    this.replySvc.add(this.form.value).subscribe(res => {
      console.log(res);
      this.replied.emit(res);
    });
  }
}
