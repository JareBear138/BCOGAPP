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

  constructor( private http: Http,  private nav: NavController) {

  }
  ionViewDidEnter() {
    this.http.get( this.url )
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.items = data;
        console.log( data );
      });
  }
  itemTapped(event, item) {
    this.nav.push(PostDetailPage, {
      item: item
    });
  }
  //TODO: Add in loading spinner

}
