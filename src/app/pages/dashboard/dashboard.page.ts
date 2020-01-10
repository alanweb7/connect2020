import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
// import { MiscService } from 'src/app/services/tools/misc.service';
import { Router } from '@angular/router';
import { MiscService } from 'src/app/services/tools/misc.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

  public code;
  public imagens;
  public token;
  public id_code;
  public docs;
  public contato;
  public segment;
  public vid_aux;
  public package_imagens;
  public package_videos;
  public package_name;
  public btn_cancelar;
  public btn_excluir;
  public btn_publicar;
  public page_doc;
  public msg_exlcuir;
  public load_enviando;
  public msg_servidor;
  public aviso;
  public arq_msg;
  public lang;
  public load_aguarde: String = 'Aguarde';
  public arq_invalido: String;

  // menu midias
  public menu_midias;
  public seg_1;
  public seg_2;
  public seg_3;
  public menu_1;
  public menu_2;
  public menu_3;
  public menu_4;

  public showMenuApps;
  public nome_page;

  constructor(
    private platform: Platform,
    private traduza: MiscService,
    private router: Router,
  ) {

    this.platform.ready().then(() => {
      // this.tools.dismissAll();
      let menuNames = {
        descricao: this.traduza.getTrans('menu_code.seg_1'),
        imagem: this.traduza.getTrans('menu_code.menu_1'),
        doc: this.traduza.getTrans('menu_code.menu_2'),
        contato: this.traduza.getTrans('menu_code.menu_4'),
        hotspot: 'HOTSOT',
        link: this.traduza.getTrans('menu_code.seg_3'),
        video: this.traduza.getTrans('menu_code.menu_3'),
        audio: 'AUDIO',
      };
      console.log('Traduzir palavras: ', this.traduza.getTrans('menu_code.page'));

      this.menu_midias = [
        { name: menuNames.descricao, icon: 'list-box', icon_color: '#ffffff', bg_color: '#7044ff', action: 'descricao' },
        { name: menuNames.imagem, icon: 'camera', icon_color: '#ffffff', bg_color: '#d649c7', action: 'imagem' },
        { name: menuNames.doc, icon: 'clipboard', icon_color: '#ffffff', bg_color: '#ffdf44', action: 'doc' },
        { name: menuNames.contato, icon: 'contact', icon_color: '#ffffff', bg_color: '#ffb000', action: 'contato' },
        { name: menuNames.hotspot, icon: 'md-wifi', icon_color: '#ffffff', bg_color: '#52f100', action: 'hotspot' },
        { name: menuNames.link, icon: 'link', icon_color: '#ffffff', bg_color: '#24d6ea', action: 'link' },
        { name: menuNames.video, icon: 'videocam', icon_color: '#ffffff', bg_color: 'red', action: 'video' },
        { name: menuNames.audio, icon: 'mic', icon_color: '#ffffff', bg_color: '#ffd50a', action: 'audio' },

      ];

    });
  }
  ionViewWillEnter() {
    console.log('Enter in Dashboard Page!!');
  }
  ngOnInit() {
    console.log('Dashboard Page!!');
  }

  logoutUser() {

  }


  getAction(event) {
    console.log('Switch do menu: ', event);
    let sendData;
    let redirect: any = false;
    let extrasNavigators: any = {};
    this.showMenuApps = true;

    switch (event) {

      case 'apps':
        this.changeSegment(2);
        this.showMenuApps = false;
        this.nome_page = this.code.toUpperCase() + " | (Painel)";
        break;
      case 'descricao':
        redirect = ['/menu-code', {showSegment: 1}];
        break;
      case 'imagem':
        sendData = { imagens: this.imagens, token: this.token, code: this.id_code, package_imagens: this.package_imagens, package_name: this.package_name, lang: this.lang };
        redirect = ['/image-code'];
        break;
      case 'doc':
        sendData = { docs: this.docs, token: this.token, code: this.id_code, load_aguarde: this.load_aguarde, btn_cancelar: this.btn_cancelar, btn_excluir: this.btn_excluir, btn_publicar: this.btn_publicar, page: this.page_doc, msg_exlcuir: this.msg_exlcuir, load_enviando: this.load_enviando, msg_servidor: this.msg_servidor, aviso: this.aviso, arq_msg: this.arq_msg, arq_invalido: this.arq_invalido, lang: this.lang };
        redirect = ['/documento-code'];
        break;
      case 'contato':
        sendData = { contato: this.contato, token: this.token, code_id: this.id_code };
        redirect = ['/contato-list'];
        // this.navCtrl.push('ContatoListPage', {contato:this.contato,token:this.token,code_id:this.id_code });
        break;
      case 'hotspot':
        // this.segment = 4;
        // this.setHotSpotApi('get');
        redirect = ['/menu-code', {showSegment: 4, setHotSpotApi: 'get'}];
        break;
      case 'video':
        sendData = { videos: this.vid_aux, token: this.token, code: this.id_code, package_videos: this.package_videos, package_name: this.package_name, package_imagens: this.package_imagens, lang: this.lang };
        redirect = ['/video-list'];
        break;
      case 'audio':
        sendData = { videos: this.vid_aux, token: this.token, code: this.id_code, package_videos: this.package_videos, package_name: this.package_name, package_imagens: this.package_imagens, lang: this.lang };
        redirect = ['/audio-list'];
        break;
      case 'link':
        // this.changeSegment(3);
        redirect = ['/menu-code', {showSegment: 3}];
        break;

      default:
        break;
    }

    if (redirect) {
      console.log('Redirecionando página: ', event);
      this.showMenuApps = false;
      this.router.navigate(redirect, extrasNavigators);
    }

  }


  changeSegment(action = null) {

  }
  setHotSpotApi(action) {

  }

}