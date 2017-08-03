import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

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
  attendanceType: string = "N/A";
  response: any;
  msg: string;



  constructor(private http: Http,private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateContactPage');
  }
  logForm(){
    let contact: Array<string> = ["Name:", this.name, "Email:", this.email, "Address:", this.address,
    "City:", this.city, "State:", this.state, "Zip Code:", this.zip, "Phone:", this.phone, "Comments:", this.comments];
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
      this.presentAlertSimple("Please fill in your name and email address!", "Missing Info");
    }else{
      if (this.validateHelper($array[1]) === false) {
      this.presentAlertSimple("Please fill in your name!<br /> Hello", "Missing Name");
      }
      if (this.validateHelper($array[3]) === false){
        this.presentAlertSimple("Please fill in your email!", "Missing Email");
      }
      if ( this.validateHelper($array[1]) == true && this.validateHelper($array[3]) == true){
        this.http.post('http://www.app.busticog.org/' +
          'contact.php', JSON.stringify($array))
          .map(res => res.json())
          .subscribe(data => {
            this.response = data;
            if( this.response['pass'] != "yes"){
              this.msg = "Error: Could not Submit Form"; //Not implemented in view
              this.presentAlertSimple(this.msg, "Error");
            }else{
              this.presentAlertSimple(this.response['msg'], this.response['title']);
            }
          }, () => {
            //If http request fails -
            this.msg = "Network Error: Try again later and make sure " +
              "you are connected to the Internet.";
            this.presentAlertSimple(this.msg, "Error");
          });
      }
    }

  }
  presentAlertSimple($msg, $title) {
    let alert = this.alertCtrl.create({
      title: $title,
      subTitle: $msg,
      buttons: ['Got it']
    });
    alert.present();
  }

}
