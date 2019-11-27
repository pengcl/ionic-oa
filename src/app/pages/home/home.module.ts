import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThemeModule} from '../../@theme/theme.module';
import {RouterModule} from '@angular/router';
import {HomePage} from './home.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ThemeModule,
    RouterModule.forChild([{path: '', component: HomePage}])
  ],
  declarations: [HomePage]
})
export class HomePageModule {
}
