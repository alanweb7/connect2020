import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { TranslateConfigService } from '../../lang/translate-config.service';

import { Platform, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../../../app/services/api/api.service';
import { CacheService } from '../../../app/services/storage/cache.service';
import { GetData, MiscService } from "../../services/tools/misc.service";

// import native
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

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

  ) {



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


}
