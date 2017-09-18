import { Component } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { PostDetailPage } from '../post-detail/post-detail';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import {NetworkDownPage} from "../network-down/network-down";
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the AudioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-audio',
  templateUrl: 'audio.html',
})
export class AudioPage {
  url: string = 'https://busticog.org/wp-json/wp/v2/posts?categories=38&per_page=10&_embed';
  items: any;
  page: any;
  eopFlag: boolean = false;
  network: string = "up";

  constructor(  private toastCtrl: ToastController,
               private http: Http,  private nav: NavController, public loading: LoadingController) {

  }



  ionViewDidLoad() {
    let loader = this.loading.create({content: 'Loading Sermons', showBackdrop: false});
    loader.present().then(() => {
      this.page = 1;
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          this.items = data;
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
    //this.page = '1';
    setTimeout(500);
    this.http.get(this.url)
      .map(res => res.json())
      .subscribe(data => {
        this.items = data;

        refresher.complete();
        this.network = "up";
      }, error => {
        let toast = this.toastCtrl.create({
        message: 'Couldn\'t refresh feed - No Connection',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();

      });
    //console.log(this.itemsPin);
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
    this.page = 1;
    console.log("Refresh Success");

    setTimeout(() => {
      //console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }


  loadPosts( page, infiniteScroll ) {

    console.log(this.url + '&page=' + page);
    return new Promise(resolve => {

      this.http.get( this.url + '&page=' + page )
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve( data );
        }, data => {
          infiniteScroll.complete();
          this.eopFlag = true;
          return;
        });

    });
  }
  itemTapped(event, item) {
    this.nav.push(PostDetailPage, {
      item: item
    });
  }
  loadMore(infiniteScroll) {
    this.page++;

    this.loadPosts( this.page, infiniteScroll ).then( items => {
      // Loads posts from WordPress API
      let length = items["length"];

      if( length === 0 ) {
        console.log("No More Posts");
        infiniteScroll.complete();
        return;
      }

      for (var i = length - 1; i >= 0; i--) {
        this.items.push( items[i] );
      }

      infiniteScroll.complete();
    });
  }


}

