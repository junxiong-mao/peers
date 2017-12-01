import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UserService } from "../services/user-service";
import { CardsService } from "../services/cards-service";
import { CardsState } from "../states/cards-state";

import { ComponentsModule } from "../components/components.module";
import { AppState } from "../states/app-state";

import { SwingModule } from 'angular2-swing';
import { AuthService } from '../services/auth/auth-service';
import { AuthServiceMock } from "../services/auth/auth-service-mock";

import { HttpModule } from '@angular/http';
import {HttpClientModule} from "@angular/common/http";

//import { CognitoUserPool } from 'amazon-cognito-identity-js';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    SwingModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AppState,
    CardsState,
    CardsService,
    //AuthService
    {provide: AuthService, useClass: AuthServiceMock}
    //CognitoUserPool,
  ]
})
export class AppModule {
}
