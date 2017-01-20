import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/home/home';

import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{ title: string, icon: string, component: any }>;
  isAppInitialized: boolean = false;
  user: any;

  constructor(
    public platform: Platform,
    private auth: AuthService,
    private data: DataService
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Page One', icon: '', component: Page1 },
      { title: 'Page Two', icon: '', component: Page2 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.auth.getUser().subscribe(data => {
        if (!this.isAppInitialized) {
          this.nav.setRoot(HomePage);
          this.isAppInitialized = true;
        }
        this.user = data;
        this.data.list('pets').subscribe(data => {
          console.log(data);
        });
      }, err => {
        this.nav.setRoot(AuthPage);
      });

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.logout()
      .then(() => {
        this.nav.setRoot(AuthPage);
      }, err => {
        console.log(err);
      });
  }
}
