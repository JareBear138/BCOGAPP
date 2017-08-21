import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {PrayerRequestsPage} from "../prayer-requests/prayer-requests";
import { SubmitprayerPage } from "../submitprayer/submitprayer";

/**
 * Generated class for the PrayerCornerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-prayer-corner',
  templateUrl: 'prayer-corner.html',
})
export class PrayerCornerPage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrayerCornerPage');
  }

  itemTapped(event, item) {
    this.navCtrl.push(PrayerRequestsPage, {

    });
  }

  itemTappedSubmit(event, item) {
    this.navCtrl.push(SubmitprayerPage, {

    });
  }

}
