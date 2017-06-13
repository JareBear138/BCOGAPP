import { Component } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { PostDetailPage } from '../post-detail/post-detail';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  url: string = 'https://busticog.org/wp-json/wp/v2/posts?categories=34&per_page=10&_embed';
  items: any;
  page: number = 1;

  constructor( private http: Http,  private nav: NavController) {

  }
  ionViewDidLoad() {
    this.http.get( this.url )
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.items = data;
        console.log( data );
      });
  }

  //TODO: Add in loading spinner
  loadPosts( page ) {

    if( !page ) {
      let page = '1';
    }
    console.log(this.url + '&page=' + page);
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
