import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrayerRequestsPage } from './prayer-requests';

@NgModule({
  declarations: [
    PrayerRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(PrayerRequestsPage),
  ],
  exports: [
    PrayerRequestsPage
  ]
})
export class PrayerRequestsPageModule {}
