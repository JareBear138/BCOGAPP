import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { PostDetailPage } from '../post-detail/post-detail';
import { LoadingController } from 'ionic-angular';

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

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

  constructor(private http: Http,  private nav: NavController, public loading: LoadingController) {

  }
  ionViewDidLoad() {
    this.page = '1';
    let loader = this.loading.create({content: 'Getting latest entries...',});
    loader.present().then(() => {
      let p = this.http.get(this.urlPinned).map(res => res.json());
      let i = this.http.get(this.url).map(res => res.json());
      Observable.forkJoin([p, i]).subscribe(results => {
        this.itemsPin = results[0];
        this.items = results[1];
        this.news = "News";
        loader.dismiss();
        console.log(this.itemsPin);
      });





    });
//this.items = data, loader.dismiss()
  }
  loadPosts( page ) {

    if( !page ) {
      let page = '1';
    }

    return new Promise(resolve => {

      this.http.get( this.url + '&page=' + page )
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve( data );
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

    this.loadPosts( this.page ).then( items => {
      // Loads posts from WordPress API
      let length = items["length"];

      if( length === 0 ) {
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
