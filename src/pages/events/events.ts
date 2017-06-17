import { Component } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

import {NavController, NavParams} from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import {NetworkDownPage} from "../network-down/network-down";

/**
 * Generated class for the EventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  url: string = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22https%3' +
    'A%2F%2Fwww.mychurchevents.com%2Fcalendar%2Frss.ashx%3Fdays%3D30%26ci%3D57621157%26igd%3D%22&format=json&diagn' +
    'ostics=true&callback=';
  items: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, public loading: LoadingController,
  private nav: NavController) {
  }

  ionViewDidLoad() {
    let loader = this.loading.create({content: 'Loading Events...', showBackdrop: false});
    loader.present().then(() => {
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          this.items = data['query']['results']['item'];
          console.log(this.items);
          loader.dismiss();
          console.log(data);
        }, error => {
          setTimeout( () => {
            loader.dismiss().then();
            this.nav.push(NetworkDownPage);
          }, 5000);
        });
    });
  }

  /**
   * The refreshLoad() function is similar to the ionViewDidLoad() function
   * but it excludes the ionic loader api as the this function is used in the
   * pull to refresh handler ( doRefresh() ) which includes its own loading
   * spinner making the ionic loader api interface redundant
   *
   * @param refresher
   *
   * @returns none
   */
  refreshLoad(refresher){
    this.http.get(this.url)
      .map(res => res.json())
      .subscribe(data => {
        this.items = data['query']['results']['item'];
        console.log("http complete");
        refresher.complete();
      }, error => {
        setTimeout( () => {
          this.nav.push(NetworkDownPage);
        }, 5000);
      });
  }

  /**
   * The doRefresh() function is the main refresh handler. refreshLoader() is
   * called and the page updates. Notice that the refresher.complete() method
   * is located in the refreshLoad() function, subsequently the refresher object
   * must be passed into the refreshLoad() function.
   *
   * @params refresher
   *
   * @returns none
   */
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.refreshLoad(refresher);


    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
