import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { NetworkDownPage } from '../network-down/network-down';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SermonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sermon',
  templateUrl: 'sermon.html',
})
export class SermonPage {

  requestURL: any = "https://busticog.org/wp-json/wp/v2/posts/1545?fields=acf";
  items: any;
  handoutURL: string = "https://docs.google.com/gview?embedded=true&url=";
  qArray: Array<string>;
  valueArray: Array<string> = ["","","","","","","","","",""];
  sendArray: Array<string> = [];
  q: string = "q";
  email: string = "";
  emailFlag: boolean = false;
  response: any;
  msg: any;
  notes: any;

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private http: Http, private nav: NavController,
  private loading: LoadingController, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    let loader = this.loading.create({content: 'Loading Questions...', showBackdrop: false});
    loader.present().then(() => {
      this.http.get(this.requestURL)
        .map(res => res.json())
        .subscribe(data => {
          this.items = data;
          loader.dismiss();
          this.emailFlag = true;
          this.handoutURL = this.handoutURL + this.items['acf']['url'];
          this.qArray = this.getQuestions();

          //console.log(this.qArray);
        }, error => {
          setTimeout( () => {
            loader.dismiss().then();
            this.nav.push(NetworkDownPage);
          }, 5000);
        });
    });

  }
  loadBrowser(){
    const browser = this.iab.create(this.handoutURL, '_blank', 'zoom=no');

    return browser;
  }

  getQuestions( ){
    let newArray: string[] = [];
    var q = 'q';
    var x = 0;
    for( var i = 1; i < 11; i++){
      if (this.items['acf'][q + String(i)] !== ""){
        newArray[x] = this.items['acf'][q + String(i)];
        x++;
      }
    }
    //console.log(newArray);
    return newArray;
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  submitHandler(){

    if (this.email != ""){
      this.removeBlanks();
      var emptyFlag = 0
      for (var i = 0; i < this.sendArray.length; i++){
        if ( this.sendArray[i] == ""){
          emptyFlag += 1;
        }
      }
      if (this.validateEmail( this.email ) == false ){
        this.presentAlertSimple("Please Enter a Valid Email!", "Attention");
      }else {
        if (emptyFlag > 0) {
          var msg = "Are you sure you wish to submit your answers? " +
            "you left " + emptyFlag + " answer(s) blank!";
          let alert = this.alertCtrl.create({
            title: 'Blank Answer(s)',
            subTitle: msg,
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => { return; }
              },
              {
                text: "Submit Anyway",
                handler: () => {
                  this.finalSubmit();
                }
              }
            ]
          });
          alert.present();
        }else{
          this.finalSubmit();
        }
      }



    }else{
      let msg = "Whoops! You need to enter an your Email!";
      this.presentAlertSimple(msg, "Missing Email");
    }
  }
  finalSubmit(){
    var greatArray = this.qArray.concat(this.sendArray);
    greatArray.unshift(this.email, this.handoutURL, this.notes);
    console.log( greatArray );
    console.log( JSON.stringify(greatArray));
    this.http.post('http://www.app.busticog.org/' +
      'sermon.php', JSON.stringify(greatArray))
      .map(res => res.json())
      .subscribe(data => {
        this.response = data;
        if( this.response['pass'] != "yes"){
          this.msg = "test"; //Not implemented in view
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
  presentAlertSimple($msg, $title) {
    let alert = this.alertCtrl.create({
      title: $title,
      subTitle: $msg,
      buttons: ['Got it']
    });
    alert.present();
  }
  removeBlanks(){
    for ( var i = 0; i < this.qArray.length; i++ ){
      this.sendArray[i] = this.valueArray[i];
    }
  }



}
