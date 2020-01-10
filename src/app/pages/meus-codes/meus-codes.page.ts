import { Component, OnInit } from '@angular/core';

// migrations
import { NavController, AlertController, LoadingController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { CodeProvider } from './../../providers/code/code';
import { NetworkProvider } from '../../providers/network/network';
import { UtilService } from '../../providers/util/util.service';
import { ViewChild } from '@angular/core';

import { FormControl } from '@angular/forms';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { Router } from '@angular/router';
import { MiscService, GetMessages, GetData } from 'src/app/services/tools/misc.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { CacheService } from 'src/app/services/storage/cache.service';

@Component({
  selector: 'app-meus-codes',
  templateUrl: './meus-codes.page.html',
  styleUrls: ['./meus-codes.page.scss'],
})
export class MeusCodesPage implements OnInit {


  endLat: any;
  endLong: any;
  public meus_codes: any;
  public meus_codesInCache: any;
  public codes_serve: any;
  token: any;
  codes: any;
  codes_videos: any;
  code_expiratiion: any;
  package_name: any;
  package_imagens: any;
  package_videos: String;
  searchTerm: string = '';
  searchControl: FormControl;
  ask_id: String;
  page;
  msg_exlcuir;
  btn_cancelar;
  btn_excluir;
  msg_erro;
  excluir_msg;
  btn_salvar;
  campo;
  pacote;
  videos;
  vencimento
  dias;
  lang;
  info;
  msg_pacote;
  texto;
  load_aguarde;
  load_enviando;
  msg_servidor;
  code_existe: any;
  language: any;
  selecione: any;
  constructor(private authService: AuthenticationService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private codeProvider: CodeProvider,
    public toast: ToastController,
    public net: NetworkProvider,

    public loadingCtrl: LoadingController,
    public util: UtilService,
    private geoProv: GeolocationProvider,
    private router: Router,
    private tools: MiscService,
    private messages: GetMessages,
    private getdata: GetData,
    private platform: Platform,
    private translate: TranslateService,
    private cacheServ: CacheService
  ) {

    this.searchControl = new FormControl();
    this.platform.ready().then(() => {
      this.meus_codesInCache = this.meus_codes;
      this._translateLanguage();
      this.getUserInfo().then(() => {
        this.getAllCode(this.token);
      });


      let modeloData = [
        {
          id: "812",
          code: "vitoria",
          descricao: " - Jsjdiijejeiu jdj.  Jdidjsjeiduduu...",
          card: "https://kscode.com.br/images/no-image.jpg",
          slug: "vitoria",
          img_link: "https://kscode.com.br/uploads/812/1569212245.jpeg",
          views: 1434,
        },
        {
          id: "812",
          code: "Clubcar",
          descricao: " - Jsjdiijejeiu jdj.  Jdidjsjeiduduu...",
          card: "https://kscode.com.br/images/no-image.jpg",
          slug: "vitoria",
          img_link: "https://kscode.com.br/uploads/812/1569212245.jpeg",
          views: 1434,
        }
      ];

      // this.codes_serve = modeloData;
      // this.meus_codes = modeloData;
    });
    // let info = this.router.getCurrentNavigation().extractedUrl.root.children.primary.segments[0];
    // console.log('Dados da Navegação: ', info);
  }

  ngOnInit() {
    console.log('Enter in ngOnInit meus-codes.page');
  }


  /**
 * Implement translation of page text once view has completed loading
 *
 * @public
 * @method ionViewDidLoad
 * @return {none}
 */
  public ionViewDidLoad(): void {
    this.util.showLoading(this.load_aguarde);
    this.pushGeoinfo();
  }


  private _translateLanguage(): void {
    // this.translate.setDefaultLang('en');
    this._initialiseTranslation();
  }


  private _initialiseTranslation(): void {
    setTimeout(() => {
      this.page = this.translate.instant("meus_codes.page");
      this.btn_cancelar = this.translate.instant("default.btn_cancelar");
      this.btn_salvar = this.translate.instant("default.btn_salvar");
      this.btn_excluir = this.translate.instant("default.btn_excluir");
      this.msg_exlcuir = this.translate.instant("default.msg_exlcuir");
      this.msg_erro = this.translate.instant("default.msg_erro");
      this.excluir_msg = this.translate.instant("default.excluir_msg");
      this.campo = this.translate.instant("meus_codes.campo");
      this.msg_pacote = this.translate.instant("default.msg_pacote");
      this.vencimento = this.translate.instant("default.vencimento");
      this.pacote = this.translate.instant("default.pacote");
      this.videos = this.translate.instant("default.videos");
      this.dias = this.translate.instant("default.dias");
      this.info = this.translate.instant("default.info");
      this.msg_servidor = this.translate.instant("default.msg_servidor");
      this.texto = this.translate.instant("criar_code.texto");
      this.campo = this.translate.instant("criar_code.campo");
      this.load_enviando = this.translate.instant("default.load_enviando");
      this.load_aguarde = this.translate.instant("default.load_aguarde");
      this.msg_erro = this.translate.instant("default.msg_erro");
      this.selecione = this.translate.instant("videos.selecione");
      this.code_existe = this.translate.instant("home.code_existe");
    }, 250);
  }




  initializeItems(): void {
    this.meus_codes = this.codes_serve;
  }
  filterList(evt) {
    this.initializeItems();
    const searchTerm = evt.srcElement.value;
    if (!searchTerm) {
      return;
    }

    this.meus_codes = this.meus_codes.filter(item => {
      if (item.code && searchTerm) {
        if (item.code.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: this.info,
      message: this.pacote + ":" + this.package_name + '<br>' + this.codes + ' CODES<br>' + this.codes_videos + " " + this.videos + ' CODE<br>' + this.vencimento + ":" + this.code_expiratiion + ' ' + this.dias,
      buttons: ['OK']
    });
    await alert.present();
  }

  ShowMenu(code) {
    let sendData = { token: this.token, code: code, package_imagens: this.package_imagens, package_videos: this.codes_videos, package_name: this.package_name, lang: this.lang };
    this.cacheServ.setCacheApi('current_code', sendData).then((res) => {
      console.log("dados do code gravado em cache: (meus-codes.ts)", res);
      this.router.navigate(['/dashboard', { code: code }]);
    });

  }

  modelData() {
    let data = {
      "message": "user_codes",
      "codes": [
        {
          "id": "812",
          "code": "vitoria",
          "descricao": "Jsjdiijejeiu jdj.  Jdidjsjeiduduus. Jdidj\nBdhdudjjdid\nJdidiofifififikd difid",
          "card": "https://kscode.com.br/images/no-image.jpg",
          "slug": "vitoria",
          "img_link": "https://kscode.com.br/uploads/812/1569212245.jpeg",
          "views": 1434
        },
        {
          "id": "920",
          "code": "casa",
          "descricao": "1234Our company is licensed by LyondellBasell Polyolefins to use the Spheripol&reg; process to produce different types of polypropylene. This technology is one preferred worldwide due to its great versatility and the quality of the products obtained.",
          "card": "https://kscode.com.br/images/no-image.jpg",
          "slug": "casa",
          "img_link": "https://kscode.com.br/uploads/920/15536339119578305959391785214033.jpg",
          "views": 213
        }
      ],
      "info_user": {
        "user_data": {
          "ID": "41",
          "user_login": "alanweb7",
          "user_pass": "$P$BVMLEBReuoXazBkpQiTjVcx5d6Bea/0",
          "user_nicename": "alanweb7",
          "user_email": "alanweb9@hotmail.com",
          "user_url": "",
          "user_registered": "2018-08-28 21:38:12",
          "user_activation_key": "1553527557:$P$BkfNsyruS9WFOrAaVxu3ZOlLX8gH2h0",
          "user_status": "0",
          "display_name": "SPOTTECH"
        },
        "nome": "Alan",
        "sobre_nome": "Adriano",
        "level": "0",
        "login": "alanweb7",
        "coupom_id": "",
        "package_code": {
          "order_id": "2560",
          "product_id": 1368,
          "package_name": "Premium",
          "package_days": "30",
          "package_codes": "100",
          "package_videos": "5",
          "package_imagens": "1000",
          "package_add": 1554231790,
          "package_expire": 1556823790
        }
      },
      "status": 200
    };
    return data;
  }

  getAllCode(token) {
    this.tools.presentLoading();
    console.log('Meus codes em cache: ', this.meus_codesInCache);

    this.codeProvider.getAllCode(token)
      .then(
        (result: any) => {
          this.tools.dismissAll();
          this.codes_serve = [];
          this.meus_codes = [];
          console.log("Resposta dos meus codes:", result);
          if (result.status == 200) {

            for (let i = 0; i < result.codes.length; i++) {
              let nov = result.codes[i];
              if (nov.descricao != "" && nov.descricao != null) {
                nov.descricao = " - " + nov.descricao.substring(0, 33) + '...';
              }

              this.codes_serve.push(nov);
              this.meus_codes.push(nov);
            }


            console.log('Code coletions in array:: ', this.codes_serve);
            this.codes = result.info_user.package_code.package_codes;
            this.codes_videos = result.info_user.package_code.package_videos;
            this.code_expiratiion = result.info_user.package_code.package_days;
            this.package_name = result.info_user.package_code.package_name;
            this.package_imagens = result.info_user.package_code.package_imagens;

            console.log("img2", this.package_imagens);

          } else if (result.status == 402) {

            let options = { message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' };
            this.messages.MessageToast(options);

            this.router.navigate(['/login', { lang: this.lang }]);

          }
          else if (result.status == 403) {
            let options = { message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' };
            this.messages.MessageToast(options);
            this.router.navigate(['/inicio', { lang: this.lang }]);
          }

        }, (error: any) => {
          let options = { message: this.msg_servidor, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' };
          this.messages.MessageToast(options);
          this.tools.dismissAll();
        });

  }
  //chamada alerta de confirmação antes de excluir
  async showConfirm(id_code) {
    const confirm = await this.alertCtrl.create({
      header: this.msg_exlcuir,
      message: '',
      buttons: [
        {
          text: this.btn_cancelar,
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: this.btn_excluir,
          handler: () => {
            this.code_remove(id_code);
          }
        }
      ]
    });
    await confirm.present();
  }

  async showAlertModel() {
    const alert = await this.alertCtrl.create({
      header: 'Alerta',
      message: this.msg_pacote + "<br>" + this.pacote + ":" + this.package_name + '<br>' + this.codes + ' CODES<br>' + this.codes_videos + " " + this.videos + ' CODE<br>' + this.vencimento + ":" + this.code_expiratiion + ' ' + this.dias,
      buttons: ['OK']
    });
    await alert.present();
  }

  async validaPacote() {
    console.log();
    // this.meus_codes.length = 100;
    console.log('Meus codes validate Package: ', this.meus_codes);
    if (this.meus_codes.length > 0) {
      if (this.meus_codes.length >= this.codes) {
        const alert = await this.alertCtrl.create({
          header: 'Alerta',
          message: this.msg_pacote + "<br>" + this.pacote + ":" + this.package_name + '<br>' + this.codes + ' CODES<br>' + this.codes_videos + " " + this.videos + ' CODE<br>' + this.vencimento + ":" + this.code_expiratiion + ' ' + this.dias,
          buttons: ['OK']
        });
        await alert.present();
      } else {
        this.showPrompt();
      }
    } else {
      this.showPrompt();
    }

  }
  async showPrompt() {
    const prompt = await this.alertCtrl.create({
      header: this.tools.getTrans('criar_code.texto'),
      inputs: [
        {
          name: 'code',
          placeholder: this.campo
        },
      ],
      buttons: [
        {
          text: this.btn_cancelar,
          handler: data => {

          }
        },
        {
          text: this.btn_salvar,
          handler: data => {
            this.code_create(data.code, data.link);
          }
        }
      ]
    });
    await prompt.present();

  }

  code_create(name_code, link) {

    this.util.showLoading(this.load_aguarde);
    let t_conteudo = "1";
    if (link != "" && link != null) {
      t_conteudo = "2";
    }

    this.codeProvider.code_create(this.token, name_code, link, t_conteudo, this.lang)
      .then(
        (result: any) => {

          console.log('Result code create response:: ', result);
          // let result = JSON.parse(res.data);
          this.tools.dismissAll();
          if (result.status == 200) {

            let options = { message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'sucesso' };
            this.messages.MessageToast(options);
            let sendData = { dataModelo: 'modelo de dados', token: this.token, code: result.IDentrada, qtd_img: this.package_imagens, qtd_videos: this.codes_videos, pacote: this.package_name };


            let NewCode = {
              card: "https://kscode.com.br/images/no-image.jpg",
              code: result.code,
              descricao: "",
              id: result.IDentrada,
              img_link: "https://kscode.com.br/images/no-image.jpg",
              slug: result.code,
              views: 0
            };

            this.meus_codes.push(NewCode);
            this.codes_serve = this.meus_codes;
            this.meus_codesInCache = this.meus_codes;

            this.ShowMenu(result.IDentrada);

          } else if (result.status == 402) {

            let options = { message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' };
            this.messages.MessageToast(options);
            this.router.navigate(['/login']);

          } else {
            let options = { message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' };
            this.messages.MessageToast(options);
          }

        }, (error: any) => {
          let options = { message: this.msg_servidor, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' };
          this.messages.MessageToast(options);
          this.tools.dismissAll();
          this.router.navigate(['/inicio']);
        });


  }

  code_remove(id_code) {

    this.util.showLoading(this.load_aguarde);
    this.codeProvider.code_remove(this.token, id_code, this.lang)
      .then(
        (result: any) => {
          this.tools.dismissAll();
          if (result.status == 200) {


            // romovendo do array
            let filtered = this.meus_codes.filter(function (item) {
              return item.id !== id_code;
            });
            this.meus_codes = filtered;

            let options = { message: this.excluir_msg, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'sucesso' };
            this.messages.MessageToast(options);
          } else if (result.status == 402) {
            let options = { message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' };
            this.messages.MessageToast(options);
            this.router.navigate(['/login']);

          } else {
            let options = { message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' };
            this.messages.MessageToast(options);
          }

        }, (error: any) => {
          let options = { message: this.msg_servidor, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' };
          this.tools.dismissAll();
          this.router.navigate(['/login']);
        });


  }
  //captura a localização via provider
  pushGeoinfo() {

    this.geoProv.getGeolocation().then((resp: String[]) => {
      console.log('home', resp);

      this.endLat = resp["latitude"];
      this.endLong = resp["longitude"];
      console.log('home', this.endLat, this.endLong);

    });
  }

  async getUserInfo() {

    let UserData = await this.getdata.getUserLogged().then((user: any) => {
      console.log('Dados do Usuario logado: ', user);

      if (user.token) {
        this.token = user.token;
        return user;
      }

    });

    return await UserData;

  }


}
