import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { PostDetailPage } from '../post-detail/post-detail';
import { LoadingController } from 'ionic-angular';

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {NetworkDownPage} from "../network-down/network-down";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@Injectable()
export class HomePage {

  url: string = 'https://busticog.org/wp-json/wp/v2/posts?categories=3&per_page=5&_embed';
  items: any;
  page: any;
  itemsPin: any;
  urlPinned: string = 'https://busticog.org/wp-json/wp/v2/posts?categories=39&_embed';
  news: any;
  eopFlag: boolean = false;
  msg: any;

  constructor(private http: Http,  private nav: NavController, public loading: LoadingController) {

  }


  /**
   * The ionViewDidLoad() function executes every time the page is loaded. This
   * function does not, however, run every time the view is entered. This allows
   * the page to be cached and prevents an api call if the user uses the back-button
   * to navigate back to the front page from a linked article
   *
   * @params: none
   *
   * @returns: none
   */
  ionViewDidLoad() {
    this.page = '1';
    let loader = this.loading.create({content: 'Loading Front Page Posts...', showBackdrop: false});
    loader.present().then(() => {
      let p = this.http.get(this.urlPinned).map(res => res.json());
      let i = this.http.get(this.url).map(res => res.json());
      Observable.forkJoin([p, i]).subscribe(results => {
        this.itemsPin = results[0];
        this.items = results[1];
        this.news = "News";
        loader.dismiss();
        console.log(this.itemsPin);
      }, error => {
        setTimeout( () => {
          loader.dismiss().then();
          this.nav.push(NetworkDownPage);
        }, 5000);
      });
    });

    /**
    setTimeout( () => {
      loader.dismiss().then();
      this.nav.push(NetworkDownPage);
    }, 10000);
        //this.items = data, loader.dismiss()
    **/
  }

  /**
   * The itemTapped() function handles the tap event for the ion-cards on the
   * front page. When an item is tapped, the view is pushed to the PostDetailPage
   * and the data within the item object follows along, allowing the post details
   * to be displayed on the new page.
   *
   * @param event
   *
   * @param item
   */
  itemTapped(event, item) {
    this.nav.push(PostDetailPage, {
      item: item
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
      let p = this.http.get(this.urlPinned).map(res => res.json());
      let i = this.http.get(this.url).map(res => res.json());
      Observable.forkJoin([p, i]).subscribe(results => {
        this.itemsPin = results[0];
        this.items = results[1];
        this.news = "News";
        refresher.complete();
        //console.log(this.itemsPin);
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
    this.eopFlag = false; //Make sure that EOP Msg doesn't show on refresh
    this.refreshLoad(refresher);
    this.page = 1;

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  /**
   * The loadPost() function takes a page number and fetches an api response for
   * wordpress using that page number and returns a promise of that api call.
   * Used in the loadMore() function which adds infinite scroll capability.
   *
   * @params page
   *
   * @returns {Promise<T>}
   */
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

  /**
   * The loadMore() function is the main infinite scroll handler. It increments the
   * page number which is then passed to the loadPosts() function. That function then
   * returns a promise. After the API call has bee completed, .then() loads the posts.
   * The function then checks the number of posts loaded, if count >=1 the posts are
   * pushed to the page, if not the infinite scroll ends.
   *
   * @param infiniteScroll
   *
   * @returns none
   */

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
