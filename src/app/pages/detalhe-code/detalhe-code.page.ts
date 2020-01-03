import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CacheService } from '../../../app/services/storage/cache.service';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { MiscService } from '../../../app/services/tools/misc.service';
import { MidiasPage } from '../midias/midias.page';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-detalhe-code',
  templateUrl: './detalhe-code.page.html',
  styleUrls: ['./detalhe-code.page.scss'],
})

export class DetalheCodePage implements OnInit {
  public code: any = { album_vimeo: [], code_sectors: {} };
  public photo;
  public videoGallery;
  public videoLink: SafeResourceUrl;
  public currentId;
  public infoLegendSlides;
  public disableNext;
  public disablePrev;
  public userInfo;
  public images;
  public audios;
  public documentos;
  public sectors;
  public hotspot;
  video: HTMLElement = document.getElementById('myVideo');
  public videoInfo: any = {};
  constructor(
    private cache: CacheService,
    public modalController: ModalController,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private tools: MiscService,
    public alertCtrl: AlertController,
    private oneSignal: OneSignal,

  ) {

    this.currentId = 0;
    this.photo = '../../../assets/imgs/user.png';
    this.platform.ready().then(() => {
      this.tools.dismissAll();
      this.getCurrentCode();
    });


  }

  ngOnInit() {
  }

  getCurrentCode() {

    this.cache.getCacheApi('current-code').then((data) => {
      if (data) {
        this.code = data;
        this.myIdOnesignal();
      } else {
        // this.code = this.getModeloData().data[0];
        // console.log('Dados do code Modelo: ', this.code);
      }

      //popula video
      this.isValidObject(this.code.code_sectors);
      if (this.code.user_info) {
        let userInfo = this.code.user_info;
        this.photo = userInfo.card;
      }

      if (this.code.user_info) {
        let userInfo = this.code.user_info;
        this.photo = userInfo.card;
      }


      if (this.code.album_vimeo.length > 0) {
        this.videoGallery = [];

        let videos = this.code.album_vimeo;

        for (var i = 0; i < videos.length; i++) {
          let vid = videos[i];
          let img = '';
          if (vid.video_pictures) {
            img = vid.video_pictures.replace('?r=pad', '');
          }

          vid.video_pictures = img;

          if (vid.post_status == "complete") {
            vid.video_link = this.sanitizer.bypassSecurityTrustResourceUrl(vid.video_link);
          }

          this.videoGallery.push(vid);

        }

        console.log('Coleção de videos: ', this.videoGallery);
        this.getVideo();

      }



    });

  }

  async getMidiaPage(param) {

    const modal = await this.modalController.create({
      component: MidiasPage,
      componentProps: {
        'type': param,
        'data': this.code
      }
    });

    return await modal.present();

  }

  handleIFrameLoadEvent(): void {

  }


  getVideo(action = null) {


    let totalVideos = this.videoGallery.length;
    console.log('Total de vídeos: ', totalVideos);



    if (this.currentId == (totalVideos - 1)) {
      this.disableNext = true;
    }

    if (action == 'up' && this.currentId < (totalVideos - 1)) {
      this.currentId = this.currentId + 1;
    }
    else if (action == 'down' && this.currentId > 0) {
      this.currentId = this.currentId - 1;
    }
    if (this.currentId < 1) {

      this.currentId = 0;

    }


    this.infoLegendSlides = (this.currentId + 1) + '/' + (totalVideos);

    if (this.videoGallery) {
      this.videoInfo = this.videoGallery[this.currentId];
    }

    this.disablePrev = this.currentId == 0 ? true : false;
    this.disableNext = this.currentId == (totalVideos - 1) ? true : false;

    console.log('Current Vídeo: ', this.videoInfo);
    console.log('ID Atual: ', this.currentId);
  }

  doRefresh(event) {


    setTimeout(() => {

    }, 2000);
  }

  // funcoes da plataforma anterior

  selectTipo(tipo) {
    if (tipo == 0) {
      this.showCheckbox(tipo, this.code.code_sectors.whatsapp);
    } else if (tipo == 1) {
      this.showCheckbox(tipo, this.code.code_sectors.fone);
    } else if (tipo == 2) {
      this.showCheckbox(tipo, this.code.code_sectors.email);
    }
    else if (tipo == 3) {
      this.showCheckbox(tipo, this.code.code_sectors.site);
    }
    else if (tipo == 4) {
      this.showCheckbox(tipo, this.code.code_sectors.facebook);
    }
    else if (tipo == 5) {
      this.showCheckbox(tipo, this.code.code_sectors.instagram);
    } else if (tipo == 6) {
      this.showCheckbox(tipo, this.code.code_sectors.linkedin);
    }
  }

  showCheckbox(tp, tipo) {
    const alert = this.alertCtrl.create({
      header: 'Selecione',
    });


    // for (var i = 0; i < tipo.length; i++) {
    //   alert.addInput({
    //     type: 'radio',
    //     label: tipo[i].titulo,
    //     value: tipo[i].conteudo,
    //     checked: false
    //   });
    // }

    // alert.addButton(this.btn_cancelar);
    // alert.addButton({
    //   text: this.btn_continuar,

    // handler: data => {

    //   if (tp == 1) {
    //     data = data.replace(this.word, '');
    //     //url = "tel:"+tipo;

    //     this.callNumber.callNumber(data, false)
    //       .then(res => console.log('Launched dialer!', res))
    //       .catch(err => console.log('Error launching dialer', err));
    //   } else {
    //     this.openWithInAppBrowser2(tp, data);

    //   }

    // }
    // });
    // alert.present();
  }

  getModeloData() {
    let data = { "data": [{ "id": 1108, "card": "https:\/\/kscode.com.br\/images\/no-image.jpg", "album_vimeo": [{ "id": "4555", "video_link": "https:\/\/player.vimeo.com\/video\/376387970?title=0&byline=0&portrait=0&color=008efe&amp\"controls=0&fullscreen=1&buttons.share=flase&embed.buttons.like=falseautoplay=0&loop=1", "link_to": null, "file_order": "1", "file_name": "1575042875348.mp4", "post_status": "complete", "file_id": "376387970", "video_pictures": "https:\/\/i.vimeocdn.com\/video\/835444636_200x150.jpg?r=pad" }, { "id": "4554", "video_link": "https:\/\/player.vimeo.com\/video\/376386096?title=0&byline=0&portrait=0&color=008efe&amp\"controls=0&fullscreen=1&buttons.share=flase&embed.buttons.like=falseautoplay=0&loop=1", "link_to": null, "file_order": "1", "file_name": "1575042162102.mp4", "post_status": "complete", "file_id": "376386096", "video_pictures": "https:\/\/i.vimeocdn.com\/video\/835442177_200x150.jpg?r=pad" }, { "id": "4413", "video_link": "https:\/\/player.vimeo.com\/video\/373577230?title=0&byline=0&portrait=0&color=008efe&amp\"controls=0&fullscreen=1&buttons.share=flase&embed.buttons.like=falseautoplay=0&loop=1", "link_to": null, "file_order": "1", "file_name": "1573906201307.mp4", "post_status": "complete", "file_id": "373577230", "video_pictures": "https:\/\/i.vimeocdn.com\/video\/831743961_200x150.jpg?r=pad" }], "audio_colection": [], "code": "clubcar", "slug": "clubcar", "titulo": "Club Car Ve\u00edculos ", "descricao": "<p>A Fam&iacute;lia Club Car Ve&iacute;culos est&aacute; a mais de 10 anos no mercado de ve&iacute;culos fazendo a diferen&ccedil;a com excel&ecirc;ncia na qualidade e atendimento aos seus clientes, a &uacute;nica loja que se compromete com 1 ANO DE GARANTIA, seus colaboradores s&atilde;o treinados para atender e realizar o sonho de consumo de seus excelent&iacute;ssimos clientes, a nossa marca &eacute; CLIENTE EM PRIMEIRO LUGAR!&nbsp;<\/p>", "pais": "", "calling_code": "", "tel_whatsapp": "", "tel_contato": "", "email": "", "website": "", "facebookUser": "", "instagramUser": "", "linkedin": "", "link": "http:\/\/", "ID_user": "245", "segmento": "", "documento": [], "id_usuario": "Vitor Guerreiro", "t_conteudo": "1", "t_video": "", "album_vimeo_id": "", "galeria": [{ "id": "4548", "img_link": "https:\/\/kscode.com.br\/uploads\/1108\/1575041993.jpeg", "link_to": null, "file_order": "1", "file_name": "178498123.jpg", "code_ads": { "type": 0, "action": null, "link_ads": null } }, { "id": "4549", "img_link": "https:\/\/kscode.com.br\/uploads\/1108\/1575041994.jpeg", "link_to": null, "file_order": "2", "file_name": "178498123.jpg", "code_ads": { "type": 0, "action": null, "link_ads": null } }, { "id": "4550", "img_link": "https:\/\/kscode.com.br\/uploads\/1108\/1575041995.jpeg", "link_to": null, "file_order": "3", "file_name": "178498123.jpg", "code_ads": { "type": 0, "action": null, "link_ads": null } }, { "id": "4551", "img_link": "https:\/\/kscode.com.br\/uploads\/1108\/1575041996.jpeg", "link_to": null, "file_order": "4", "file_name": "178498123.jpg", "code_ads": { "type": 0, "action": null, "link_ads": null } }, { "id": "4552", "img_link": "https:\/\/kscode.com.br\/uploads\/1108\/1575041997.jpeg", "link_to": null, "file_order": "5", "file_name": "178498123.jpg", "code_ads": { "type": 0, "action": null, "link_ads": null } }, { "id": "4553", "img_link": "https:\/\/kscode.com.br\/uploads\/1108\/1575042046.jpeg", "link_to": null, "file_order": "6", "file_name": "178498123.jpg", "code_ads": { "type": 0, "action": null, "link_ads": null } }], "password": "", "isprivate": false, "": "", "ask_code": { "ask_id": "", "ask_info": null, "ask_results": { "option1": null, "option2": null, "total": 0 } }, "code_sectors": { "whatsapp": [{ "id": "1454", "titulo": "VENDAS ", "conteudo": "(91) 98988-1075", "pais": "Brazil", "calling_code": "+55" }, { "id": "1456", "titulo": "LOJA ", "conteudo": "(91) 99344-31313", "pais": "Brazil", "calling_code": "+55" }], "telefone": [{ "id": "1455", "titulo": "VENDAS ", "conteudo": "(91) 98988-1075", "pais": "Brazil", "calling_code": "+55" }], "email": [{ "id": "1457", "titulo": "ENTENDIMENTO ", "conteudo": "Club-car@hotmail.com ", "pais": "Brazil", "calling_code": "+55" }], "site": [{ "id": "1458", "titulo": "Geral", "conteudo": "http:\/\/clubcarbelem.com.br\/", "pais": "Brazil", "calling_code": "+55" }], "facebook": [{ "id": "1459", "titulo": "LOJA", "conteudo": "https:\/\/m.facebook.com\/clubcarveiculosbelem\/photos\/a.800924490066222\/1157295054429162\/?type=3&source=44&locale2=pt_BR", "pais": "Brazil", "calling_code": "+55" }], "instagram": [{ "id": "1460", "titulo": "Loja ", "conteudo": "https:\/\/instagram.com\/clubcarveiculos?igshid=q22ewsm504nz", "pais": "Brazil", "calling_code": "+55" }, { "id": "1460", "titulo": "Loja ", "conteudo": "https:\/\/instagram.com\/clubcarveiculos?igshid=q22ewsm504nz", "pais": "Brazil", "calling_code": "+55" }], "linkedin": [] }, "hotspot": { "ssid": "Direcao", "password": "Club#2019", "isHotspotActive": true, "isOnlyHotspot": true, "isRegisterScreen": true }, "vews": 51, "user_info": { "name": "Vitor Guerreiro", "intro": "Vitor Guerreiro te convidou para conhecer o seu canal Connect: ", "card": "https:\/\/kscode.com.br\/uploads\/1108\/1575041993.jpeg", "link": "https:\/\/kscode.com.br\/card?code=clubcar" } }], "status": 200 };
    return data;
  }

  isValidObject(object) {

    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        if (element.length == 0) {
          object[key] = false;
        }
      }
    }

  }

  async myPlayerIdOnesignal() {
    this.oneSignal.endInit();
    this.oneSignal.getIds().then((id) => {
      console.log(id.userId);
      // this.player_id = id.userId;

      let dataTag = { "userId": id.userId };
      this.oneSignal.sendTags(dataTag);

      // console.log('OneSignal Player ID: ', this.player_id);
    });

  }

  myIdOnesignal() {
    this.oneSignal.startInit('d9687a3a-3df5-4565-b183-653e84ed8207', '8700496258');

    this.oneSignal.endInit();
    this.oneSignal.getIds().then((id) => {

      // registrando tags
      // this.info = this.navParams.get('info');
      let tagCode = this.code.code;

      let dataTag = '{"' + tagCode + '":"true"}';
      let Tagcode = JSON.parse(dataTag);

      this.oneSignal.sendTags(Tagcode);

      // alert.present();


    });


  }

}
