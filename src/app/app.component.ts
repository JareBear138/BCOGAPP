import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { EventsPage } from  '../pages/events/events';
import { NewsletterPage } from '../pages/newsletter/newsletter';
import { SermonPage } from '../pages/sermon/sermon';
import { AudioPage } from '../pages/audio/audio';
import { ResponseCardsPage } from '../pages/response-cards/response-cards';
import { UpdateContactPage } from '../pages/update-contact/update-contact';
import { NextStepsPage } from '../pages/next-steps/next-steps';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { PrayerCornerPage } from '../pages/prayer-corner/prayer-corner';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Blog Articles', component: ListPage },
      { title: 'Upcoming Events', component: EventsPage },
      { title: 'Newsletter', component: NewsletterPage},
      { title: 'Sermon Handout', component: SermonPage},
      { title: 'Audio Sermons', component: AudioPage},
      { title: 'Response Card', component: ResponseCardsPage},
      { title: 'Prayer Corner', component: PrayerCornerPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
