import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AuthService} from '../../../auth/auth.service';
import {CommentService} from './comment.service';
import {NoticeService} from '../../notice.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() id;
  @Output() count = new EventEmitter<any>();
  token = this.authSvc.token();
  comments;
  subjectComments;
  likes = [];

  constructor(private authSvc: AuthService,
              private commentSvc: CommentService,
              private noticeSvc: NoticeService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.commentSvc.liked(this.id).pipe(map(likes => this.likes = likes)).subscribe(likes => {
      this.commentSvc.list({noticeInfoId: this.id}).subscribe(res => {
        const ids = [];
        likes.forEach(item => {
          ids.push(item.commentId);
        });
        this.comments = res;
        const subjectComments = [];
        res.forEach(item => {
          item.liked = false;
          if (ids.indexOf(item.id) !== -1) {
            item.liked = true;
          }
          if (item.pid === '-1') {
            subjectComments.push(item);
          }
        });
        this.subjectComments = subjectComments;
        this.count.emit(res.length);
      });
    });
  }

  onReplied(e) {
    this.getData();
  }

  like(id, liked) {
    this.noticeSvc.like(id, liked).subscribe(res => {
      this.getData();
    });
  }

  getCount(id) {
    const list = [];
    this.comments.forEach((item) => {
      if (item.pid === id) {
        list.push(item);
      }
    });
    return list.length;
  }
}
