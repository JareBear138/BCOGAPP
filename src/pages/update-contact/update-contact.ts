import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the UpdateContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-update-contact',
  templateUrl: 'update-contact.html',
})
export class UpdateContactPage {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  dob: string;
  comments: string;



  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateContactPage');
  }
  logForm(){
    let contact: Array<string> = ["Name:", this.name, "Email:", this.email, "Address:", this.address,
    "City:", this.city, "State:", this.state, "Zip Code:", this.zip, "Phone:", this.phone, "Date of Birth:",
    this.dob, "Comments:", this.comments];
    console.log(contact);
    this.validateAndSubmit(contact);

  }
  validateHelper($arrayIndex){
    console.log( $arrayIndex );
    if (typeof $arrayIndex == "undefined" ){
      console.log("WOOOOOOO");
      return false;
    }
    if( $arrayIndex.length <= 1){
      return false;
    }else{
      return true;
    }
  }
  validateAndSubmit( $array ){
    if ( this.validateHelper($array[1]) == false && this.validateHelper($array[3]) == false){
      this.presentAlert("Please fill in your name and email address!");
    }else{
      if (this.validateHelper($array[1]) === false) {
      this.presentAlert("Please fill in your name!<br /> Hello");
      }
      if (this.validateHelper($array[3]) === false){
        this.presentAlert("Please fill in your email!");
      }
    }

  }
  presentAlert($msg) {
    let alert = this.alertCtrl.create({
      title: 'Missing Required Info',
      subTitle: $msg,
      buttons: ['Got it']
    });
    alert.present();
  }

}
