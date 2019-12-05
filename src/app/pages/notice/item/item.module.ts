import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ThemeModule} from '../../../@theme/theme.module';
import {NoticeItemPage} from './item.page';
import {CommentComponent} from '../components/comment/comment.component';
import {ReplyComponent} from '../components/reply/reply.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: NoticeItemPage}])
  ],
  declarations: [NoticeItemPage, CommentComponent, ReplyComponent],
  entryComponents: [CommentComponent, ReplyComponent]
})
export class NoticeItemPageModule {
}
