import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./list/list.module').then(m => m.ScheduleListPageModule)
  },
  {
    path: 'item/:id',
    loadChildren: () =>
      import('./item/item.module').then(m => m.ScheduleItemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule {
}
