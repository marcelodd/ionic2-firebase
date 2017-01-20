import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { AuthService } from '../../../services/auth.service';

import { HomePage } from '../../home/home';
import { SignUpPage } from '../sign-up/sign-up';
import { LoginEmailPage } from '../login-email/login-email';
import { TermsOfServicePage } from '../../terms-of-service/terms-of-service';



@Component({
    selector: 'auth-home',
    templateUrl: 'home.html'
})
export class AuthPage implements OnInit {
    error: any;

    constructor(
        private navCtrl: NavController,
        private auth: AuthService
    ) { }

    ngOnInit() { }

    openSignUpPage() {
        this.navCtrl.push(SignUpPage);
    }

    openLoginPage() {
        this.navCtrl.push(LoginEmailPage);
    }

    openTermsOfService() {
        this.navCtrl.push(TermsOfServicePage);
    }

    loginUserWithFacebook() {
        this.auth.loginWithFacebook().subscribe(data => {
            this.navCtrl.setRoot(HomePage);
        }, err => {
            this.error = err;
        });
    }
}