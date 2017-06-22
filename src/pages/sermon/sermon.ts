import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { NetworkDownPage } from '../network-down/network-down';
import { LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private nav: NavController,
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
          this.handoutURL = this.handoutURL + this.items['acf']['url'];
          this.qArray = this.getQuestions();
          console.log(this.qArray);
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
    console.log(newArray);
    return newArray;
  }
  submitHandler(){

  }

}
