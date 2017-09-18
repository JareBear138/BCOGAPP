import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { NetworkDownPage } from '../network-down/network-down';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the NextStepsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-next-steps',
  templateUrl: 'next-steps.html',
})
export class NextStepsPage {
  requestURL: any = "https://busticog.org/wp-json/wp/v2/posts/1916?fields=acf";
  items: any;
  eArray: Array<string>;
  valueArray: Array<string> = ["","","","","","","","","",""];
  sendArray: Array<string> = [];
  q: string = "step";
  email: string = "";
  emailFlag: boolean = false;
  response: any;
  msg: any;
  notes: any;
  name: any = "";
  network: string = "up";

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,
              private http: Http, private nav: NavController, private loading: LoadingController,
              private iab: InAppBrowser, private toastCtrl: ToastController) {
  }
  /**
   * The ionViewDidLoad() function executes every time the page is loaded. This
   * function does not, however, run every time the view is entered. This allows
   * the page to be cached and prevents an api call if the user uses the back-button
   * to navigate back to the front page from a linked article
   *
   * @params: none
   *
   * @returns: void
   */
  ionViewDidLoad() {
    let loader = this.loading.create({content: 'Loading Steps', showBackdrop: false});
    loader.present().then(() => {
      this.http.get(this.requestURL)
        .map(res => res.json())
        .subscribe(data => {
          this.items = data;
          loader.dismiss();
          this.emailFlag = true;
          this.eArray = this.getEvents();
        }, () => {
          setTimeout( () => {
            loader.dismiss().then();
            this.network = "down";
            this.nav.push(NetworkDownPage);
          }, 5000);
        });
    });

  }

  getEvents( ){
    let newArray: string[] = [];
    var q = 'step';
    var x = 0;
    for( var i = 1; i < 7; i++){
      if (this.items['acf'][q + String(i)] !== ""){
        newArray[x] = this.items['acf'][q + String(i)];
        this.valueArray[x] = "false"; //Set Value arrays to false to uncheck all option by default
        x++;
      }
    }
    //console.log(newArray);
    return newArray;
  }

  validateEmail(email) {
    if ( email == ""){
      return true;
    }else{
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
  submitHandler(){
    if (this.name !== ""){
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
      let msg = "Please provide your name";
      this.presentAlertSimple(msg, "Name not provided");
    }
  }

  /**
   * The finalSubmit() function is the function that submits all of the necessary information through
   * an HTTP Request to the backend. The function combines all data into a single array (greatArray).
   * The final submit function also waits for a response from the server to notify the user if the
   * server was able to receive the info and send out an email successfully.
   *
   * @param none
   *
   *@returns void
   */
  finalSubmit(){
    var greatArray = this.eArray.concat(this.sendArray);
    greatArray.unshift(this.name,this.email, this.notes);
    //TODO: Remove domain literal
    console.log(JSON.stringify(greatArray));
    this.http.post('http://www.app.busticog.org/' +
      'steps.php', JSON.stringify(greatArray))
      .map(res => res.json())
      .subscribe(data => {

        this.response = data;
        if( this.response['pass'] != "yes"){
          this.msg = "Unable to submit at this time"; //TODO: Fix this
          this.presentAlertSimple(this.msg, "Error");
        }else{
          let toast = this.toastCtrl.create({
            message: this.response['msg'],
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

  /**
   * The removeBlanks() function cuts down the length of the array for the answers to the questions.
   * The largest amount of questions that can be provided in the backend is 10. Therefore, the valueArray is
   * declared and instantiated with 10 empty strings. If less than 10 questions are provided, this function
   * removes the blank index positions for the non-existent questions. A new array called the sendArray is
   * created. The amount of answers transferred to the new array is determined by the number of questions
   * asked (len of qArray).
   *
   * @param none
   * @returns void
   */
  removeBlanks(){
    for ( var i = 0; i < this.eArray.length; i++ ){
      this.sendArray[i] = this.valueArray[i];
    }
  }



}
