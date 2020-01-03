import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: NativeStorage,
    private platform: Platform,
    public toastController: ToastController
  ) {
    
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
    
  }

  ionViewWillEnter() {
    console.log('AuthenticationService Page!!');
  }

  ifLoggedIn() {
    console.log('Verificando o Usuário!');

    this.storage.getItem('USER_INFO').then((response) => {
      if (response) {
        console.log('Dados gravados ifLoggedIn: ',response);
        this.authState.next(true);
      }
    });

  }

  login(userData) {
   
    this.storage.setItem('USER_INFO', userData).then((response) => {
      this.authState.next(true);
      this.router.navigate(['meus-codes']);
    });
    
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.authState.next(false);
      this.router.navigate(['login']);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }



}