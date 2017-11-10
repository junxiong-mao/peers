import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Loading, LoadingController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AppState } from "../states/app-state";
import { Subscription } from "rxjs/Subscription";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit, OnDestroy {
  @ViewChild(Nav) nav: Nav;
  loading: Loading;

  appStateSubscription: Subscription;
  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private appState: AppState,
              public loadingCtrl: LoadingController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'List', component: ListPage}
    ];

  }

  ngOnInit(): void {
    this.createLoading();
    this.appStateSubscription = this.appState.isLoading.subscribe(
      isLoading => {
        if (isLoading) {
          this.createLoading();
          this.loading.present();
        } else {
          if(this.loading) {
            this.loading.dismiss();
          }
        }
      }
    )
  }

  ngOnDestroy(): void {
    this.appStateSubscription.unsubscribe();
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

  private createLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }
}
