import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverinfoPage } from '../popoverinfo/popoverinfo';

/**
 * Generated class for the SubmitprayerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-submitprayer',
  templateUrl: 'submitprayer.html',
})
export class SubmitprayerPage {

  privacyBox: any;
  appPrivacyBox: any;
  name: any;
  email: any;
  prayer: any;
  refFlag: any = {refFlag: "submitPrayer"};

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitprayerPage');
  }

  presentPopover( myEvent ) {

    let popover = this.popoverCtrl.create(PopoverinfoPage, this.refFlag );
    popover.present({
      ev: myEvent
    });
  }

}
