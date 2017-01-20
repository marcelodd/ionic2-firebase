import { Injectable } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import { DataService } from './data.service';
import { Facebook } from 'ionic-native';
import { Observable } from 'rxjs/observable';
import { Platform } from 'ionic-angular';

import firebase from 'firebase';


//Observables http://blog.rangle.io/observables-and-reactive-programming-in-angular-2/

@Injectable()
export class AuthService {
    constructor(
        private af: AngularFire,
        private db: DataService,
        private platform: Platform
    ) { }

    getUser(): Observable<any> {
        return Observable.create(observer => {
            this.af.auth.subscribe(authData => {
                if (authData) {
                    this.db.getObject('users/' + authData.uid)
                        .subscribe(userData => {
                            console.log(userData);
                            observer.next(userData);
                        }, err => {
                            observer.error(err);
                        });
                } else {
                    observer.error();
                }
            });
        });
    }

    registerUser(credentials: any) {
        return Observable.create(observer => {
            this.af.auth.createUser(credentials)
                .then((authData: any) => {
                    this.af.database.list('users').update(authData.uid, {
                        name: authData.auth.email,
                        amail: authData.auth.email,
                        emailVerified: false,
                        provider: 'email',
                        image: 'https://freeiconshop.com/files/edd/person-solid.png'
                    });
                    credentials.created = true;
                    observer.next(credentials);
                }).catch((error: any) => {
                    switch (error.code) {
                        case 'INVALID_EMAIL':
                            observer.error('E-mail inválido.');
                            break;
                        case 'EMAIL_TAKEN':
                            observer.error('Este e-mail já está sendo utilizado.');
                            break;
                        case 'NETWORK_ERROR':
                            observer.error('Aconteceu algum erro ao tentar se conectar ao servidor, tente novamente mais tarde.');
                            break;
                        default:
                            observer.error(error);
                    }
                });
        });
    }

    loginWithEmail(credentials) {
        return Observable.create(observer => {
            this.af.auth.login(credentials, {
                provider: AuthProviders.Password,
                method: AuthMethods.Password
            }).then(authData => {
                observer.next(authData);
            }).catch(error => {
                observer.next(error);
            });
        });
    }

    loginWithFacebook(): Observable<any> {
        return Observable.create(observer => {
            if (this.platform.is('cordova')) {
                Facebook.login(['public_profile', 'email'])
                    .then(facebookData => {
                        let provider = firebase.auth.FacebookAuthProvider.credential(facebookData.authResponse.accessToken);
                        firebase.auth().signInWithCredential(provider)
                            .then(firebaseData => {
                                this.af.database.list('users').update(firebaseData.uid, {
                                    name: firebaseData.displayName,
                                    email: firebaseData.email,
                                    provider: 'facebook',
                                    image: firebaseData.photoUrl
                                });
                                observer.next();
                            });
                    }, error => {
                        observer.error(error);
                    });
            } else {
                this.af.auth.login({
                    provider: AuthProviders.Facebook,
                    method: AuthMethods.Popup
                }).then((facebookData) => {
                    this.af.database.list('users').update(facebookData.auth.uid, {
                        name: facebookData.auth.displayName,
                        email: facebookData.auth.email,
                        provider: 'facebook',
                        image: facebookData.auth.photoURL
                    });
                    observer.next();
                }).catch((error) => {
                    console.info("error", error);
                    observer.error(error);
                });
            }
        });
    }

    sendPasswordResetEmail(email) {
        return Observable.create(observer => {
            firebase.auth().sendPasswordResetEmail(email).then(function () {
                observer.next();
                // Email sent.
            }, function (error) {
                observer.error(error);
                // An error happened.
            });
        });
    }

    logout(): Promise<void> {
        return this.af.auth.logout();
    }
}