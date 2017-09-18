import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PopoverinfoPage } from '../popoverinfo/popoverinfo';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ModalController} from 'ionic-angular';

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

  privacyBox: any = false;
  appPrivacyBox: any = false;
  name: any = "";
  email: any = "";
  prayer: any = "";
  refFlag: any = {refFlag: "submitPrayer"};
  sendArray: Array<string> = [];
  response: any;
  msg: any;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController,
              public popoverCtrl: ModalController, public navCtrl: NavController,
              private http: Http, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubmitprayerPage');
  }

  presentPopover( myEvent ) {

    let popover = this.popoverCtrl.create(PopoverinfoPage, this.refFlag);
    popover.present();
  }
  submitPrayer(){
    if ( this.validateEmail( this.email ) == false) {
      this.presentAlertSimple("That is not a valid email", "Invalid Info");
    }
    if (this.validateEmail(this.email) == true){
      if (this.name == ""){
        this.presentAlertSimple("Please fill in your name", "Invalid Info");
      }else if (this.name != ""){
        if (this.prayer == ""){
          this.presentAlertSimple( "Please include your prayer request", "Missing Prayer Request");
        }
        else if (this.prayer != ""){
          this.submitRequest();
        }
      }
    }
  }

  submitRequest(){
    this.sendArray.unshift(this.privacyBox, this.appPrivacyBox, this.name, this.email, this.prayer);
    console.log(JSON.stringify(this.sendArray));
    this.http.post('http://www.app.busticog.org/' +
      'prayer.php', JSON.stringify(this.sendArray))
      .map(res => res.json())
      .subscribe(data => {
        this.response = data;
        if( this.response['pass'] == "no"){
          this.msg = "Unable to Submit Request at this time";
          let toast = this.toastCtrl.create({
              message: this.msg,
              position: 'bottom',
              showCloseButton: true,
            closeButtonText: "Ok"
            });
          toast.present();
        }else if (this.response['pass'] == "yes"){
          this.msg = this.response['msg'];
          let toast = this.toastCtrl.create({
            message: this.msg,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: "Ok"
          });
          toast.present();
        }
      }, () => {
        //If HTTP request fails -
        this.msg = "Network Error: Try again later and make sure " +
          "you are connected to the Internet.";
        let toast = this.toastCtrl.create({
          message: this.msg,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: "Ok"
        });
        toast.present();
      });




  }


  /**
   * The presentAlertSimple() function creates an Ionic alert object with the provided
   * parameters ($msg - The alert message, and $title - The title for the alert)
   *
   * @param $msg
   * @param $title
   */
  presentAlertSimple($msg, $title) {
    let alert = this.alertCtrl.create({
      title: $title,
      subTitle: $msg,
      buttons: ['Got it']
    });
    alert.present();
  }

  validateEmail(email) {
    //TODO: Split RE into multiple lines with RE Object
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
