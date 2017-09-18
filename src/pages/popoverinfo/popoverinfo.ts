import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-popoverinfo',
  templateUrl: 'popoverinfo.html',
})
export class PopoverinfoPage {

  refFlag: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  this.refFlag = this.navParams.data.refFlag;

  }




  close() {
    this.viewCtrl.dismiss();
  }

}
