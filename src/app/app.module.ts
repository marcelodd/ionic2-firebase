import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { FormsModule } from '@angular/forms';

// Pages
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

import { ForgotPasswordPage } from '../pages/auth/forgot-password/forgot-password';
import { AuthPage } from '../pages/auth/home/home';
import { LoginEmailPage } from '../pages/auth/login-email/login-email';
import { SignUpPage } from '../pages/auth/sign-up/sign-up';
import { HomePage } from '../pages/home/home';
import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';

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
    Page2,
    ForgotPasswordPage,
    AuthPage,
    LoginEmailPage,
    SignUpPage,
    HomePage,
    TermsOfServicePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    ForgotPasswordPage,
    AuthPage,
    LoginEmailPage,
    SignUpPage,
    HomePage,
    TermsOfServicePage
  ],
  providers: [
    AuthService,
    DataService
  ]
})
export class AppModule { }
