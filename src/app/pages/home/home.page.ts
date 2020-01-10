import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { TranslateConfigService } from '../../lang/translate-config.service';

import { Platform, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../services/api/api.service';
import { CacheService } from '../../services/storage/cache.service';
import { GetData, MiscService } from "../../services/tools/misc.service";

// import native
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private host = 'https://kscode.com.br/ksc_2020';
  private apiUrl: string;
  private url: string;
  public responseApi: any = {};
  public messageStyle;

  token: any;

  public timePeriodToExit = 2000;
  public timeLatestLogin = 1578201969920;

  selectedLanguage: string;

  // @ViewChild('input', { static: false }) myInput: Input;
  public message: string;
  public modalIsOpen: boolean;
  public signupform: FormGroup;
  public loginForm: FormGroup;

  public keyBoardisOpen: Boolean = false;

  codeNumber: any;

  public language: string = "pt";
  public langTrans;

  // back button close
  public subscription;

  constructor(
    private router: Router,
    private cache: CacheService,
    private api: ApiService,
    private tools: MiscService,
    public platform: Platform,
    public _translate: TranslateService,
    private translateConfigService: TranslateConfigService,
    private formBuilder: FormBuilder,
    private qrScanner: QRScanner,
    private keyboard: Keyboard,
    private getdata: GetData,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    private googlePlus: GooglePlus,
    private loc?: Location

  ) {


    // TODO: replace current token if hash token is newer, unexpired
    if (window.location.hash.match(/^#access_token/) && !this.token) {
      this.parseToken();
      loc.go('/');
    }
    else if (this.token) {
      console.log('found token: ', this.token);
    }

    this.platform.ready().then((res) => {

      this.oneSignalApp();
      this.getdata.getBaseName().then((readCode) => {
        console.log('Code lido no QRFunctions: ', readCode);
      });

      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      this._translate.setDefaultLang(this.selectedLanguage);

    });

    this.signupform = this.formBuilder.group({

      codeNumber: new FormControl('', [])

    });

  }

  ionViewDidEnter() {
    // this.selectedLanguage = 'pt';
    // this.subscription = this.platform.backButton.subscribe(() => {
    //   navigator['app'].exitApp();
    // });
    this.getParams('?card=vitoria&codeID=812');

  }

  ionViewWillLeave() {
    // this.subscription.unsubscribe(); //funcao de sair do app
  }


  ngAfterViewInit() {
    console.log('ngAfterViewInit function enter');

    this.platform.ready().then(() => {

      this.keyboard.onKeyboardShow().subscribe(() => {
        this.altenateLogo();
        let tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
          Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
          });
        }
      });

      let teclado = this.keyboard.onKeyboardHide().subscribe(() => {
        this.altenateLogo();
        let tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
          Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'flex';
          });
        }
      });
    });


  }
  ngOnInit() {
    console.log('ngOnInit function enter');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad function enter');
  }

  getCode(param = null) {
    this.tools.presentLoading();
    let code = this.signupform.value.codeNumber;
    if (param) {
      code = param;
    }
    this.api.getCode(code).then((res) => {
      console.log('Dados do code pesquisado na home: ', res);
      if (res.status !== 200) {

        this.tools.dismissAll();
        this.messageStyle = {
          'color': 'red'
        };
        this.responseApi = res;
      }
      if (res.status == 200) {
        this.router.navigate(['/detalhe-code']);
      }
    });
  }

  getParams(url = null) {

    let data = this.getdata.getParams('https://www.kscode.com.br?card=vitoria&code_id=812');
    console.log('Get Data: ', data);

  }

  altenateLogo() {
    this.keyBoardisOpen = this.keyBoardisOpen ? false : true;
  }

  // push notification onesignal
  oneSignalApp() {
    // console.log(this.btn_fechar, this.btn_ircode);
    this.oneSignal.startInit('d9687a3a-3df5-4565-b183-653e84ed8207', '8700496258');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationReceived().subscribe(notification => {
      console.log(notification);
      //var notificationData       = notification.notification.payload;
      /*  var notificationAdditional = notificationData.additionalData;
       var notificationCode       = notificationAdditional.code; */
      // this.redirectPush(notification);

      this.pushAlert(notification);

    });


    this.oneSignal.handleNotificationOpened().subscribe(notification => {
      let notificationData = notification.notification.payload;
      let notificationAdditional = notificationData.additionalData;
      let notificationCode = notificationAdditional.code;
      this.tools.presentLoading('Aguarde...');
      this.api.getCode(notificationCode).then((res) => {
        console.log('Dados do Push: ', res);
        if (res.status == 200) {
          this.router.navigate(['/detalhe-code']);
        }
      });
    });

    this.oneSignal.endInit();
  }


  async pushAlert(notification) {

    const confirm = await this.alertCtrl.create({
      header: notification.payload.title,
      message: notification.payload.body,
      buttons: [
        {
          text: 'Fechar',
          handler: () => {

          }
        },
        {
          text: 'Ver conteúdo',
          handler: () => {
            this.tools.presentLoading('Aguarde...');
            this.api.getCode(notification.payload.additionalData.code).then((res) => {
              if (res.status == 200) {
                this.router.navigate(['/detalhe-code']);
              }
            });
          }
        }
      ]
    });
    await confirm.present();
  }
  loginGoogle() {


    let url = "https://accounts.google.com/o/oauth2/auth?client_id=295999061864-s532o8p0ovo9khan5evobsl8aqvuaeu2.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fkscode.com.br%2Flive&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube&response_type=code&access_type=offline";
    let data = {
      url: url,
      method: 'post',
      header: { 'Content-Type': 'application/x-www-form-urlencoded' }
    };

    this.api.getApi(data).then((res) => {

      console.log('Daddos da api:', res);

    });

  }

  loginComGoogle() {

    this.googlePlus.login({
      // 'webClientId': '576453826777-7rs50lgb7e07te41u28fuq9auom0ues7.apps.googleusercontent.com',
    }).then((res) => {
        console.log(res);
        alert(JSON.stringify(res));
    }, (err) => {
        console.log(JSON.stringify(err));
    });

  }


  call() {
    // build authUrl:
    let authBase = 'https://accounts.google.com/o/oauth2/v2/auth';
    let authParams = {
      response_type: 'code',
      access_type: 'offline',
      client_id: '295999061864-s532o8p0ovo9khan5evobsl8aqvuaeu2.apps.googleusercontent.com',
      redirect_uri: 'https://kscode.com.br/live',
      // redirect_uri: window.location.origin,
      scope: 'https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube'
    };
    let params = [];
    for (let k in authParams) {
      params.push(k + '=' + authParams[k]);
    }
    let authUrl = authBase + '?' + params.join('&');
    window.open(authUrl, '_self');
  }

  // TODO: move this to Token constructor?  Token(location.hash)
  parseToken() {
    this.token = {
      created: new Date().getTime()
    }
    let parmStr = location.hash.substring(1); // strip leading hash
    let parms = parmStr.split('&');

    console.log('Params recebidos: ', parms);
    for (let i in parms) {
      let kv = parms[i].split('=');
      this.token[kv[0]] = kv[1];
    }
  }

}
