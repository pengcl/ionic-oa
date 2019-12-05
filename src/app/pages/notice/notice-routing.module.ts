import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [

  {
    path: 'list',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./list/list.module').then(m => m.NoticeListPageModule)
      }
    ]
  },
  {
    path: 'dept',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./dept/dept.module').then(m => m.NoticeDeptPageModule)
      }
    ]
  },
  {
    path: 'item/:id',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./item/item.module').then(m => m.NoticeItemPageModule)
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
export class NoticeRoutingModule {
}
