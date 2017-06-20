import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {Http} from '@angular/http';


/**
 * Generated class for the NewsletterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-newsletter',
  templateUrl: 'newsletter.html',
})
export class NewsletterPage {

  browser: any;
  email: any = "";
  data: any
  response: any;
  classVar: any;
  msg: any;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsletterPage');


  }

  loadBrowser(){
    const browser = this.iab.create('https://docs.google.com/gview?embedded=true&url=' +
      'https://www.busticog.org/wp-content/uploads/Busti-Beacon-June-2017.pdf', '_blank', 'zoom=no');


    return browser;
  }
  submitHandler(){

    this.classVar = "";
    this.response = "";
    this.http.post('http://www.app.busticog.org/' +
      'newsletter.php/?email=' + this.email, "email request")
      .map(res => res.json())
      .subscribe(data => {
        this.response = data;
        console.log(this.response.message);
        console.log("API CALL SUCCESS");
        if( this.response.pass == "no"){
          this.classVar = "negative";
          this.msg = "Error"
        }else{
          this.classVar = "positive";
          this.msg = "Success"
        }
      }, data => {
        this.classVar = "negative"
      });
  }
  nothing(){

  }

}
