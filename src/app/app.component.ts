import { Component, ViewChildren, QueryList, NgZone } from '@angular/core';

import { Platform, Events, IonRouterOutlet, ModalController, MenuController, ActionSheetController, PopoverController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from './lang/translate-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // set up hardware back button event.
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  public selectedLanguage;
  public statusLog: boolean = false;
  public appPages = [
    {
      title: 'Home',
      url: '/inicio',
      icon: 'home'
    },
    {
      title: 'Aplicações',
      url: '/aplicacoes',
      icon: 'construct'
    },
  ];

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events,
    private login: AuthenticationService,
    private translate: TranslateService,
    private translateConfigService: TranslateConfigService,
    private authenticationService: AuthenticationService,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private toast: ToastController,
    private ngZone: NgZone

  ) {

    platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
      this.initializeApp();
    });

    events.subscribe('user:created', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', user, 'at', time);
      this.statusLog = user ? true : false;
    });

    this.backButtonEvent();

  }

  initializeApp() {
    this.getStatusLoggedIn();
  }


  access() {
    this.platform.ready().then(() => {

      this.authenticationService.authState.subscribe(state => {
        if (state) {
          console.log('Você está logado');
          this.router.navigate(['/meus-codes', { 'data': 'dashboard' }], { replaceUrl: true });
        }
        else {
          console.log('Você NÃO está logado');

          this.router.navigate(['/login']);
        }
      });

    });
  }

  logout() {

    this.login.logout();
    this.statusLog = false;
    console.log('Sair da conta!');

    this.router.navigate(['/inicio']);

  }

  getStatusLoggedIn() {
    this.authenticationService.authState.subscribe(state => {
      if (state) {
        console.log('Você está logado');
        this.statusLog = true;
      }
      else {
        console.log('Você NÃO está logado');
        this.statusLog = false;
      }
    });

  }

  // active hardware back button
  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      console.log('Botao voltar acionado!');

      try {

        if (this.router.url === '/home' || this.router.url === '/inicio') {
          console.log('Vontando home');
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            // this.platform.exitApp(); // Exit from app
            navigator['app'].exitApp(); // work for ionic 4

          } else {

            const toast = await this.toast.create({
              header: 'Press back again to exit App.',
              duration: 2000,
              position: 'middle'
            });

            this.lastTimeBackPress = new Date().getTime();
          }
        } else {
          let page = this.router.url;
          console.log('Página atual: ', page);
          let routerUrl = '/inicio';

          switch (page) {
            case '/menu-code':
              routerUrl = '/meus-codes'
              break;

            default:
              break;
          }
          this.ngZone.run(async () => {
            await this.router.navigate([routerUrl]);
          });


        }


      } catch (error) {


      }


      // close action sheet
      try {
        console.log('close action sheet');

        const element = await this.actionSheetCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
      }

      // close popover
      try {
        const element = await this.popoverCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
      }

      // close modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);

      }

      // close side menua
      try {
        console.log('close side menua');
        const element = await this.menu.getOpen();
        if (element !== null) {
          this.menu.close();
          return;

        }

      } catch (error) {

      }


      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        console.log('Vontando 1.1');
        if (outlet && outlet.canGoBack()) {
          outlet.pop();

          console.log('Vontando 1');

        }
        else if (this.router.url === '/home' || this.router.url === '/inicio') {
          console.log('menu navigator app.compponent: ', this.router.url);
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            // this.platform.exitApp(); // Exit from app
            navigator['app'].exitApp(); // work for ionic 4

          } else {

            const toast = await this.toast.create({
              header: 'Press back again to exit App.',
              duration: 2000,
              position: 'middle'
            });

            this.lastTimeBackPress = new Date().getTime();
          }
        }
        else if (this.router.url === '/menu-code') {
          console.log('menu navigator app.compponent: ', this.router.url);
          this.router.navigateByUrl('/meus-codes');
        }
      });
    });
  }
}
