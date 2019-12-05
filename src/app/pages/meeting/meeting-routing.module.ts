import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {
    path: 'list',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./list/list.module').then(m => m.MeetingListPageModule)
      }
    ]
  },
  {
    path: 'item/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./item/item.module').then(m => m.MeetingItemPageModule)
      }
    ]
  },
  {
    path: 'members/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./members/members.module').then(m => m.MeetingMembersPageModule)
      }
    ]
  },
  {
    path: 'issue/list/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./issue/list/list.module').then(m => m.MeetingIssueListPageModule)
      }
    ]
  },
  {
    path: 'issue/item/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./issue/item/item.module').then(m => m.MeetingIssueItemPageModule)
      }
    ]
  },
  {
    path: 'issue/add/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./issue/add/add.module').then(m => m.MeetingIssueAddPageModule)
      }
    ]
  },
  {
    path: 'issue/edit/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./issue/edit/edit.module').then(m => m.MeetingIssueEditPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingRoutingModule {
}
