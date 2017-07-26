import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PostDetailPage } from '../pages/post-detail/post-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { NetworkDownPage } from "../pages/network-down/network-down";
import { EventsPage } from "../pages/events/events";
import { NewsletterPage } from "../pages/newsletter/newsletter";
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { FormsModule }   from '@angular/forms';
import {SermonPage} from "../pages/sermon/sermon";
import { AudioPage } from '../pages/audio/audio';
import { ResponseCardsPage } from '../pages/response-cards/response-cards';
import { UpdateContactPage } from '../pages/update-contact/update-contact';
import { NextStepsPage } from '../pages/next-steps/next-steps';
import { SignUpPage } from '../pages/sign-up/sign-up';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PostDetailPage,
    NetworkDownPage,
    EventsPage,
    NewsletterPage,
    SermonPage,
    AudioPage,
    ResponseCardsPage,
    UpdateContactPage,
    NextStepsPage,
    SignUpPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PostDetailPage,
    NetworkDownPage,
    EventsPage,
    NewsletterPage,
    SermonPage,
    AudioPage,
    ResponseCardsPage,
    UpdateContactPage,
    NextStepsPage,
    SignUpPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser
  ]
})
export class AppModule {}
