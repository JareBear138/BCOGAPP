import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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
  url: any = "https://busticog.org/wp-json/wp/v2/posts/1940?fields=acf";
  newsletterURL: any;
  data: any;
  response: any;
  classVar: any;
  msg: any;
  network: any = "down";
  items: any;
  emailFlag: any = false;

  constructor( private toastCtrl: ToastController, private http: Http, public navCtrl: NavController,
               public navParams: NavParams, private iab: InAppBrowser, private loading: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loading.create({content: 'Loading Newsletter', showBackdrop: false});
    loader.present().then(() => {
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          this.items = data;
          loader.dismiss();
          this.emailFlag = true;
          this.newsletterURL = this.items['acf']['url'];
        }, () => {
          setTimeout( () => {
            loader.dismiss().then();
            this.network = "down";
          }, 5000);
        });
    });

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
      this.newsletterURL, '_blank', 'zoom=yes');

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
          let toast = this.toastCtrl.create({
            message: this.response['message'],
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }else{
          let toast = this.toastCtrl.create({
            message: 'Sign-Up Successfully Submitted',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      }, data => {
        let toast = this.toastCtrl.create({
          message: 'Network Error - Try Again Later',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
  }
  nothing(){

  }

}
