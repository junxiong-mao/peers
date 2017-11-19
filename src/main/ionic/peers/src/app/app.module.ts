import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MyProfile } from "../pages/my-profile/my-profile";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserService } from "../services/user-service";
import { CardsService } from "../services/cards-service";
import { CardsState } from "../states/cards-state";

import { ComponentsModule } from "../components/components.module";
import { AppState } from "../states/app-state";

import { SwingModule } from 'angular2-swing';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MyProfile,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    SwingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MyProfile,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AppState,
    CardsState,
    CardsService,
  ]
})
export class AppModule {
}
