import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Platform } from '@ionic/angular';
//import provider
import { ViewChild } from '@angular/core';
import { CodeProvider } from './../../providers/code/code';
import { UtilService } from '../../providers/util/util.service';
import { MiscService } from '../../services/tools/misc.service';
import { TranslateConfigService } from '../../../app/lang/translate-config.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-aplicacoes',
  templateUrl: './aplicacoes.page.html',
  styleUrls: ['./aplicacoes.page.scss'],
})
export class AplicacoesPage implements OnInit {

  public selectedLanguage: string;
  public users : any[];
  page         : number;
  public links : any = [];
  page_pesquisa;
  
    load_aguarde: any;
    msg_servidor: any;
    constructor(
      public navCtrl        : NavController,
      private codeProvider  : CodeProvider,
      public loadingCtrl    : LoadingController,
      public util           : UtilService,
      public toast          : ToastController,
      private tools: MiscService,
      public _translate: TranslateService,
      private translateConfigService: TranslateConfigService,
      private platform: Platform
    ) {

      this.platform.ready().then(()=>{
        this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
        this._translate.setDefaultLang(this.selectedLanguage);
      });
    }
    ngOnInit() {
    }
    ionViewDidLoad() {
      this.util.showLoading(this.load_aguarde);
    }
    ionViewDidEnter() {
      this.getAllinks(this.page);
    }
  
  getAllinks(page: any) {
    this.codeProvider.getLinks(page)
    .then(
      (result: any) =>{
        console.log('result na pagina pesquisa!::',result);
          var user = result.data[0];
          this.tools.dismissAll();
          this.links = user;
  
      })
       ,(error:any) => {
         alert('Ocorreu um erro inesperado! Tente de novo.');
        // this.toast.create({ message:this.msg_servidor, duration: 3000 ,closeButtonText: 'Ok!',cssClass: 'error'  }).present();
        this.tools.dismissAll();
  
        // this.navCtrl.setRoot('HomePage');
  
      };
  }
  
  }
  