import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SermonsPage } from './sermons';

@NgModule({
  declarations: [
    SermonsPage,
  ],
  imports: [
    IonicPageModule.forChild(SermonsPage),
  ],
  exports: [
    SermonsPage
  ]
})
export class SermonsPageModule {}
