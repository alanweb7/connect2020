import { Component, ViewChildren, QueryList, NgZone } from '@angular/core';

import { Platform, Events, IonRouterOutlet, ModalController, MenuController, ActionSheetController, PopoverController, ToastController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from './lang/translate-config.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { ApiService } from './services/api/api.service';
import { MiscService } from './services/tools/misc.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // set up hardware back button event.
  backButtonSubscription;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  public pagesRouter = [];
  public selectedLanguage;
  public statusLog: boolean = false;
  public appPages = [
    {
      title: 'Home',
      url: '/inicio',
      icon: 'home',
      routerDirection: 'root'
    },
    {
      title: 'Aplicações',
      url: '/aplicacoes',
      icon: 'construct',

    },
  ];

  constructor(
    private router: Router,
    private platform: Platform,
    private deeplinks: Deeplinks,
    private tools: MiscService,
    private api: ApiService,
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
    private ngZone: NgZone,
    private navCtrl: NavController
  ) {

    this.pagesRouter = [
      { link: '' },
      { link: '/', '/meus-codes': '/inicio' },
      { link: '/', '/meus-codes': '/inicio' }
    ]
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

    // deeplink function
    this.deeplinks.route({
      '/card': { 'card': 'DetalheCodePage', },
      '/sobre/:postId': 'SobrePage',
      '/user/:userId': 'UserDetailsPage',
      '/code/:code_id': 'ProductPage',
      '/:code_id': 'DetalheCodePage'
    }).subscribe(match => {
      // match.$route - the route we matched, which is the matched entry from the arguments to route()
      // match.$args - the args passed in the link
      // match.$link - the full link data
      // console.log('Successfully routed', match.$link.queryString.substring(4, 50));
      // console.log('Successfully routed', match.$link.queryString);
      console.log('Successfully matched route', match);
      if (match.$args.code_id) {
        this.tools.presentLoading();
        let code = match.$args.code_id;
        this.api.getCode(code).then((res) => {

          console.log('Dados do code from deeplink (AppComponent): ', res);
          if (res.status === 200) {
            this.router.navigate(['/detalhe-code']);
          }

        });

      }

    }, nomatch => {
      // nomatch.$link - the full link data
      console.error('Got a deeplink that didn\'t match', nomatch);
    });
    this.getStatusLoggedIn();
  }

  ngOnDestroy() {
    console.log('Saindo da função:');
    this.backButtonSubscription.unsubscribe();
  }

  isLoggedIn() {
    this.authenticationService.authState.subscribe(state => {
      if (!state) {


        this.router.navigate(['/login']);

      }

    });
  }

  access() {
    this.platform.ready().then(() => {

      this.authenticationService.authState.subscribe(state => {
        if (state) {
          console.log('Você está logado');
          this.router.navigate(['/meus-codes', { 'data': 'meus-codes' }]);
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

    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {

      // close action sheet
      try {
        const element = await this.actionSheetCtrl.getTop();
        if (element) {
          console.log('close action sheet');
          element.dismiss();
          return;
        }
      } catch (error) {
      }

      // close popover
      try {
        const element = await this.popoverCtrl.getTop();
        if (element) {
          console.log('close popover');
          element.dismiss();
          return;
        }
      } catch (error) {
      }

      // close modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          console.log('close modal');
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);

      }

      // close side menu
      try {
        const element = await this.menu.getOpen();
        if (element !== null) {
          console.log('close side menu');
          this.menu.close();
          return;

        }

      } catch (error) {

      }

      try {

        console.log('Entrando no try 1');

        this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
          const element = await this.menu.getOpen();

          // verifica se o menu esta fechado
          if (!element) {

            console.log('Menu está fechado.');


            if (outlet && outlet.canGoBack()) {
              /**
             * Estrutura de navegacao
             * se nao tiver historico volta pra home
             */
              console.log('Verificando outlet.canGoBack()');

              console.log('Ultima pagina navegada: ', outlet.getLastUrl());
              // outlet.pop(); //volta todos os níveis
              // this.navCtrl.setDirection('back');
              this.navCtrl.navigateBack('/menu-code');

            }
            else if (this.router.url === '/home' || this.router.url === '/inicio') {

              console.log('Verificando se está na home');
              if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                // this.platform.exitApp(); // Exit from app
                navigator['app'].exitApp(); // work for ionic 4

              } else {

                const toast = await this.toast.create({
                  header: 'Press back again to exit App.',
                  duration: 2000,
                  position: 'middle'
                });

                toast.present();

                this.lastTimeBackPress = new Date().getTime();
              }

            }



            // let page = this.router.url.includes(';') ? this.router.url.split(';')[0] : this.router.url;

            // console.log('Página atual: ', page);
            // let routerUrl;
            // let rootUrl = false;

            // switch (page) {
            //   case '/menu-code':
            //     routerUrl = '/meus-codes';
            //     break;
            //   case '/meus-codes':
            //   case '/aplicacoes':
            //     routerUrl = '/inicio';
            //     rootUrl = true;
            //     break;

            //   default:
            //     break;
            // }


            // this.ngZone.run(async () => {
            //   if (rootUrl) {
            //     console.log('Navegando para Home:: Root');
            //     await this.navCtrl.navigateRoot('/inicio');
            //   } else {
            //     console.log('Voltando uma etapa');
            //     await this.router.navigate([routerUrl]);
            //   }
            // });


          }/// final de funcoes com menun fechado

          console.log('Final do this.routerOutlets.forEach:');
        }); //final do this.routerOutlets.forEach

      } catch (error) {

        console.log('Error do try 1');

      } //final do try 1 this.routerOutlets.forEach



    }); //final do this.backButtonSubscription
  }//final backButtonEvent
}
