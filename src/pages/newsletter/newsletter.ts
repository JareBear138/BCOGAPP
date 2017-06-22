import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';


/**
 * Generated class for the NewsletterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-newsletter',
  templateUrl: 'newsletter.html',
})
export class NewsletterPage {

  browser: any;
  email: any = "";
  data: any;
  response: any;
  classVar: any;
  msg: any;

  constructor(private http: Http, public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsletterPage');


  }

  /**
   * The loadBrowser function creates a iab object and opens it in the view.
   * This function is implemented in the view through the use of a button (onClick).
   *
   * @params: none (yet) future - pass url
   *
   * @returns {InAppBrowserObject}
   *
   */
  loadBrowser(){
    const browser = this.iab.create('https://docs.google.com/gview?embedded=true&url=' +
      'https://www.busticog.org/wp-content/uploads/Busti-Beacon-June-2017.pdf', '_blank', 'zoom=no');

    return browser;
  }

  /**
   * The submitHandler() function is the primary form handler. The function takes the
   * values in the fields and sends a post request with the information to the backend.
   * Note: the actual values are sent using GET as they are appended to the url for the
   * request. This makes the backend simpler as there is not need for decoding or
   * accessing the raw post data.
   *
   * @params: none
   *
   * @returns: void
   *
   */
  submitHandler(){

    this.classVar = ""; //reset the styling var
    this.response = ""; //reset the pass or fail msg
    this.http.post('http://www.app.busticog.org/' +
      'newsletter.php/?email=' + this.email, "email request")
      .map(res => res.json())
      .subscribe(data => {
        this.response = data;
        //console.log(this.response.message);
        //console.log("API CALL SUCCESS");
        //Test to see if email was sent
        if( this.response.pass == "no"){
          this.classVar = "negative"; //set styling var
          this.msg = "Error"; //Not implemented in view
        }else{
          this.classVar = "positive";
          this.msg = "Success";
        }
      }, data => {
        //If http request fails -
        this.classVar = "negative";
        this.msg = "Network Error: try again later";
      });
  }
  nothing(){

  }

}
