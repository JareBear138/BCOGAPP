import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SermonPage } from './sermon';

@NgModule({
  declarations: [
    SermonPage,
  ],
  imports: [
    IonicPageModule.forChild(SermonPage),
  ],
  exports: [
    SermonPage
  ]
})
export class SermonPageModule {}
