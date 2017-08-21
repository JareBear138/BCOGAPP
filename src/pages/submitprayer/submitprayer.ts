import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitprayerPage');
  }

}
