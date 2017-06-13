import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NetworkDownPage } from './network-down';

@NgModule({
  declarations: [
    NetworkDownPage,
  ],
  imports: [
    IonicPageModule.forChild(NetworkDownPage),
  ],
  exports: [
    NetworkDownPage
  ]
})
export class NetworkDownPageModule {}
