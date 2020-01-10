import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, Platform, Events } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ApiService } from './api/api.service';


@Injectable()
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: NativeStorage,
    private platform: Platform,
    public toastController: ToastController,
    private api: ApiService,
    private events: Events,
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

      if (response.token) {

        let dataAtual = new Date().getTime();
        let dateToExpiration = response.dateToExpiration;
        console.log('O login expira em: ', new Date(response.dateToExpiration));

        if (dateToExpiration < dataAtual) {

          // verificar a validade do token
          /** data: {
            * url: 'http://restfull.site.com?params',
            * method: 'post|get|delete'
            * data: Object,
            * header: {}
            * }
            **/

           this.storage.remove('USER_INFO').then(() => {
            console.log('Usuário removido com sucesso!');
          }).catch((error) => {
            console.log('Erro ao remover o Usuário!', error);
          });

           this.authState.next(false);
           this.events.unsubscribe('user:created');
          //  this.logout();

          // let data = {
          //   url: 'https://kscode.com.br/ksc_2020/wp-json/jwt-auth/v1/token/validate',
          //   method: 'post',
          //   header: { 'Authorization': 'Bearer ' + response.token }
          // };

          // this.api.getApi(data).then((res) => {
          //   if (res.code && res.data.status === 200) {
          //     console.log('Dados gravados ifLoggedIn: ', response);
          //     this.authState.next(true);
          //   } else {

          //     this.storage.remove('USER_INFO').then(() => {
          //       console.log('Usuário removido com sucesso!');
          //     }).catch((error) => {
          //       console.log('Erro ao remover o Usuário!', error);
          //     });

          //     this.authState.next(false);
          //   }
          // });

        }else{
          this.authState.next(true);
        }

      }
    });

  }

  login(userData) {

    let dataAtual = new Date().getTime();
    let addMinuts = (60000 * 1);
    let addDays = (60000 * 60 * 24 * 2);
    let dateToExpiration = new Date(dataAtual + addDays).getTime();
    userData.dateToExpiration = dateToExpiration;  //data de expiracao do login

    this.storage.setItem('USER_INFO', userData).then((response) => {
      this.router.navigate(['/meus-codes']), { replaceUrl: true };
      this.authState.next(true);
    });
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['login']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }



}