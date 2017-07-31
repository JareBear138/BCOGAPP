import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import {UpdateContactPage} from "../update-contact/update-contact";
import {SignUpPage} from "../sign-up/sign-up";
import {NextStepsPage} from "../next-steps/next-steps";

/**
 * Generated class for the ResponseCardsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-response-cards',
  templateUrl: 'response-cards.html',
})
export class ResponseCardsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResponseCardsPage');
  }
  contactTapped(){
    this.navCtrl.push( UpdateContactPage );
  }
  eventsTapped(){
    this.navCtrl.push( SignUpPage );
  }
  stepsTapped(){
    this.navCtrl.push( NextStepsPage );
  }

}
