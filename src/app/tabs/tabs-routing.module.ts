import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../pages/auth/auth.guard';
import {TabsPage} from './tabs.page';

const routes: Routes = [
  {
    path: 'pages',
    component: TabsPage,
    children: [
      {
        path: 'home',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'document',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/document/document.module').then(m => m.DocumentPageModule)
          },
        ]
      },
      {
        path: 'meeting',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/meeting/meeting.module').then(m => m.MeetingPageModule)
          },
        ]
      },
      {
        path: 'schedule',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/schedule/schedule.module').then(m => m.SchedulePageModule)
          }
        ]
      },
      {
        path: 'member',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/member/member.module').then(m => m.MemberPageModule)
          }
        ]
      },
      {
        path: 'notice',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/notice/notice.module').then(m => m.NoticePageModule)
          }
        ]
      },
      {
        path: 'auth',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/auth/auth.module').then(m => m.AuthPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/pages/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/pages/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class TabsPageRoutingModule {
}
