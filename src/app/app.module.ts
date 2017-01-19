import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { FormsModule } from '@angular/forms';

// Pages
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

// Providers
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyA4m20QxKl3JGIaIayiK_s_xT1lvg4Kj_U",
  authDomain: "ionic-2-e-firebase.firebaseapp.com",
  databaseURL: "https://ionic-2-e-firebase.firebaseio.com",
  storageBucket: "ionic-2-e-firebase.appspot.com",
  messagingSenderId: "250012282062"
}

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    DataService
  ]
})
export class AppModule { }
