import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResponseCardsPage } from './response-cards';

@NgModule({
  declarations: [
    ResponseCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(ResponseCardsPage),
  ],
  exports: [
    ResponseCardsPage
  ]
})
export class ResponseCardsPageModule {}
