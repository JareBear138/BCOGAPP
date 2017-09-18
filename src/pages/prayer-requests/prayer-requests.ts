import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import {Http} from '@angular/http';

import {NetworkDownPage} from "../network-down/network-down";
/**
 * Generated class for the PrayerRequestsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-prayer-requests',
  templateUrl: 'prayer-requests.html',
})

export class PrayerRequestsPage {

  url: string = "https://busticog.org/wp-json/wp/v2/posts/1906?fields=acf";
  items: any;
  projects: any;
  praises: any;
  requests: any;
  prayerType: string = "projectsSwitch";
  loaded: boolean = false;
  network: string = "up";


  constructor(public nav: NavController, public navParams: NavParams, private http: Http, public loading: LoadingController) {
  }

  ionViewDidLoad() {
    let loader = this.loading.create({content: 'Gathering Prayer Requests..', showBackdrop: false});
    loader.present().then(() => {
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          this.items = data;
          this.projects = this.items['acf']['p_projects'];
          this.praises = this.items['acf']['praises'];
          this.requests = this.items['acf']['p_requests'];
          this.loaded = true;
          loader.dismiss();
          //console.log(data);
        }, error => {
          setTimeout( () => {
            loader.dismiss().then();
            this.network = "down";
            this.nav.push(NetworkDownPage);
          }, 5000);
        });
    });
  }

}
