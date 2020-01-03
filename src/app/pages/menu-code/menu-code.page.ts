import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';


// migrations
import { NavController, ModalController, LoadingController, ToastController, AlertController, Platform, Events } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NetworkProvider } from '../../providers/network/network';
import { CodeProvider } from './../../providers/code/code';
import { UtilService } from '../../providers/util/util.service';
import { TranslateService } from '@ngx-translate/core';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { MiscService } from 'src/app/services/tools/misc.service';
import { TranslateConfigService } from 'src/app/lang/translate-config.service';

@Component({
  selector: 'app-menu-code',
  templateUrl: './menu-code.page.html',
  styleUrls: ['./menu-code.page.scss'],
})
export class MenuCodePage implements OnInit {
  public codeData;
  public refresh;
  public currency;
  public menu_midias: any[];
  public nome_page;


  // migrations
  public menuSegments;
  public showMenuApps: boolean = false;
  token: any;
  code: any;
  imagens: any;
  videos: any[];
  vid_aux: any;
  docs: any;
  name: any;
  link: any;
  descricao: any;
  titulo: any;
  id_code: any;
  qtd_img: Number;
  public segment: any = 2;
  package_videos: Number;
  package_name: String;
  word = /[^0-9]+/g;
  tag = /<[^>]*>/g;
  password: String;
  isprivate: Boolean;
  meu_link: any;
  t_conteudo: String;
  card: string;
  package_imagens: String;
  isIos: boolean;

  // configuracoes hotspot
  hotspotData: any;
  isWifiSelected: boolean;
  networks: any;
  isHotspotActive: boolean = false;
  isOnlyHotspot: boolean = false;
  messageHotspot: string;
  errorHotspotConnect: boolean;
  inSearch: boolean;
  isConnected: number = 0;
  hotspotConditions: boolean;
  sectorUser: string;
  messages: Messages;

  selectedLanguage;

  hotspotuserInfo: object;
  showDetails: any = {
    icon: {
      ios: 'ios-arrow-dropdown-circle',
      md: 'md-arrow-dropdown-circle'
    },
    is_active: false
  };

  errorEmail: any;

  // back button
  public subscription;
  public user_info = new UserInfoData;

  contato = {
    pais: String,
    whatsapp: String,
    telefone: String,
    email: String,
    facebook: String,
    instagram: String,
    linkedin: String,
    website: String
  }

  texto;
  seg_1;
  seg_2;
  seg_3;
  menu_1;
  menu_2;
  menu_3;
  menu_4;
  button;
  lang;
  msg_erro: any;
  editorInit: any;
  initEditor3: any;
  private dummyData;

  // moved before constructor


  modelG: geral;
  //validação de formulario
  public cadastroForm: any;
  public cadastroCode: any;
  model: Link;
  modelC: Code;
  //validação de formulario
  public loginForm: any;
  public hotSpotForm: any;
  messageEmail = "";
  selectedSegment: string;
  page;
  btn_publicar;
  btn_cancelar;
  btn_excluir;
  pacote;
  videos_;
  vencimento
  dias;
  info;
  msg_pacote;
  load_aguarde;
  load_enviando;
  msg_servidor;
  visite_code;
  titulo_lang;
  descricao_lang;
  senha;
  ativa_senha;
  campo;
  ativar_lik;
  btn_enviar;
  campo_1;
  campo_2;
  texto_push;
  campo_obrigatorio;
  aviso;
  msg_aviso;
  arq_invalido;
  arq_msg;
  page_contato;
  texto_contato;
  msg_exlcuir;
  page_doc;
  slug: String;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    public toast: ToastController,
    private codeProvider: CodeProvider,
    public loadingCtrl: LoadingController,
    public net: NetworkProvider,
    public util: UtilService,
    public alertCtrl: AlertController,
    private socialSharing: SocialSharing,
    public translate: TranslateService,
    private translateConfigService: TranslateConfigService,
    public platform: Platform,
    private hotspot: Hotspot,
    private tools: MiscService,
    private ngZone: NgZone
  ) {

    this.router.initialNavigation();

    console.log('Dados passados via route params (constuct) menu-code.ts: ', this.route.snapshot.params);

    this.menu_midias = [
      { name: this.seg_1, icon: 'list-box', icon_color: '#ffffff', bg_color: '#7044ff', action: 'descricao' },
      { name: this.menu_1, icon: 'camera', icon_color: '#ffffff', bg_color: '#d649c7', action: 'imagem' },
      { name: this.menu_2, icon: 'clipboard', icon_color: '#ffffff', bg_color: '#ffdf44', action: 'doc' },
      { name: this.menu_4, icon: 'contact', icon_color: '#ffffff', bg_color: '#ffb000', action: 'contato' },
      { name: 'HOTSPOT', icon: 'md-wifi', icon_color: '#ffffff', bg_color: '#52f100', action: 'hotspot' },
      { name: this.seg_3, icon: 'link', icon_color: '#ffffff', bg_color: '#24d6ea', action: 'link' },
      { name: this.menu_3, icon: 'videocam', icon_color: '#ffffff', bg_color: 'red', action: 'video' },
      { name: 'ÁUDIO', icon: 'mic', icon_color: '#ffffff', bg_color: '#ffd50a', action: 'audio' },

    ];

    // migrations
    this.messages = new Messages();
    this.user_info = new UserInfoData();
    if (this.platform.is('ios')) {
      this.isIos = true;
    }

    this.selectedSegment = '0';
    //instanica do model login
    this.model = new Link();
    //instancia do formulario builder para validar os campos
    this.loginForm = formBuilder.group({
      link: ['', Validators.required],
      islink: ['', Validators.required]

    });
    this.hotSpotForm = formBuilder.group({
      ssid: ['', Validators.required],
      password: ['', Validators.required],
      isHotspotActive: [''],
      isOnlyHotspot: [''],
      isRegisterScreen: [''],
    });

    this.modelC = new Code();
    this.cadastroCode = formBuilder.group({
      name: ['', Validators.required],

    });
    //instanica do model login
    this.modelG = new geral();
    //instancia do formulario builder para validar os campos
    this.cadastroForm = formBuilder.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      password: ['', Validators.required],
      isprivate: ['', Validators.required]
    });

    this.platform.ready().then(() => {
      this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
      this.translate.setDefaultLang(this.selectedLanguage);
      this.initialConfig();
    });

  }

  getAction(event) {
    console.log('Switch do menu: ', event);
    let sendData;
    let redirect: any = false;
    this.showMenuApps = true;

    switch (event) {

      case 'apps':
        this.changeSegment(2);
        this.showMenuApps = false;
        this.nome_page = this.code.toUpperCase() + " | (Painel)";
        break;
      case 'descricao':
        this.changeSegment(1);
        this.nome_page = this.code.toUpperCase() + " | Título";
        break;
      case 'imagem':
        sendData = { imagens: this.imagens, token: this.token, code: this.id_code, package_imagens: this.package_imagens, package_name: this.package_name, lang: this.lang };
        redirect = '/image-code';
        break;
      case 'doc':
        sendData = { docs: this.docs, token: this.token, code: this.id_code, load_aguarde: this.load_aguarde, btn_cancelar: this.btn_cancelar, btn_excluir: this.btn_excluir, btn_publicar: this.btn_publicar, page: this.page_doc, msg_exlcuir: this.msg_exlcuir, load_enviando: this.load_enviando, msg_servidor: this.msg_servidor, aviso: this.aviso, arq_msg: this.arq_msg, arq_invalido: this.arq_invalido, lang: this.lang };
        redirect = '/documento-code';
        break;
      case 'contato':
        sendData = { contato: this.contato, token: this.token, code_id: this.id_code };
        redirect = '/contato-list';
        // this.navCtrl.push('ContatoListPage', {contato:this.contato,token:this.token,code_id:this.id_code });
        break;
      case 'hotspot':
        this.segment = 4;
        this.setHotSpotApi('get');
        this.nome_page = this.code.toUpperCase() + " | (Hotspot)";
        break;
      case 'video':
        sendData = { videos: this.vid_aux, token: this.token, code: this.id_code, package_videos: this.package_videos, package_name: this.package_name, package_imagens: this.package_imagens, lang: this.lang };
        redirect = '/video-list';
        break;
      case 'audio':
        sendData = { videos: this.vid_aux, token: this.token, code: this.id_code, package_videos: this.package_videos, package_name: this.package_name, package_imagens: this.package_imagens, lang: this.lang };
        redirect = '/audio-list';
        break;
      case 'link':
        this.changeSegment(3);
        this.nome_page = this.code.toUpperCase() + " | (Link)";
        break;

      default:
        break;
    }

    if (redirect) {
      console.log('Redirecionando página: ', event);
      this.showMenuApps = false;
      this.router.navigate([redirect, {teste:'legal'}]);
    }

  }

  initialConfig() {
    console.log('Entre in initialConfig::');
    this.token = String;
    this.code = String;
    this.titulo = String;
    this.descricao = String;
    this.link = String;
    this.videos = [];
    this.code = "";
    this.token = "";
    this.link = "";
    this.descricao = "";
    this.titulo = "";
    this.contato.telefone = String;
    this.package_name = "";
    this.qtd_img = 0;
    this.package_videos = 0;
    this.meu_link = String;
    this.meu_link = "";
    this.t_conteudo = "";


    console.log('Dados passados via route params (ionViewDidLoad) menu-code.ts: ', this.route.snapshot.params);

    this.package_imagens = this.route.snapshot.params['package_imagens'];
    this.token = this.route.snapshot.params['token'];
    this.id_code = this.route.snapshot.params['code'];
    this.package_name = this.route.snapshot.params['package_name'];
    this.package_imagens = this.route.snapshot.params['package_imagens'];
    this.package_videos = this.route.snapshot.params['package_videos'];
    this.dummyData = this.route.snapshot.params['dummyData'];

    // this.package_imagens = this.navParams.get('package_imagens');
    // this.token = this.navParams.get('token');
    // this.id_code = this.navParams.get('code');
    // this.package_name = this.navParams.get('package_name');
    // this.package_imagens = this.navParams.get('package_imagens');
    // this.package_videos = this.navParams.get('package_videos');


    console.log("img", this.lang);
    console.log("Code recebido no construct:: ", this.id_code);

    this.menuSegments = [
      { name: 'cadastroCode' },
      { name: 'midias' },
    ];

    this._translateLanguage();
  }//fnal de initialConfig

  ngOnInit() {
  }


  ionViewDidLoad() {
    this._translateLanguage();
  }

  ionViewWillEnter() {
    console.log('Page menu-code,ts ionViewWillEnter');
  }

  //fazer o start do slide
  ionViewDidEnter() {
    console.log('Page menu-code,ts ionViewDidEnter');
    // this.selectedLanguage = 'pt';
 
    // this.getShowCode();

  }

  ionViewWillLeave() {
    console.log('Page menu-code,ts ionViewWillLeave');
  }

  private _translateLanguage(): void {
    this.translate.use(this.lang);
    console.log("linguagem", this.lang);
    this._initialiseTranslation();

  }
  private _initialiseTranslation(): void {
    setTimeout(() => {
      this.page = this.translate.instant("menu_code.page");
      this.btn_cancelar = this.translate.instant("default.btn_cancelar");
      this.msg_pacote = this.translate.instant("default.msg_pacote");
      this.vencimento = this.translate.instant("default.vencimento");
      this.pacote = this.translate.instant("default.pacote");
      this.videos = this.translate.instant("default.videos");
      this.dias = this.translate.instant("default.dias");
      this.info = this.translate.instant("default.info");
      this.campo_obrigatorio = this.translate.instant("default.campo_obrigatorio");
      this.msg_servidor = this.translate.instant("default.msg_servidor");
      this.texto = this.translate.instant("criar_code.texto");
      this.load_enviando = this.translate.instant("default.load_enviando");
      this.load_aguarde = this.translate.instant("default.load_aguarde");
      this.msg_erro = this.translate.instant("default.msg_erro");
      this.visite_code = this.translate.instant("default.visite_code");
      this.texto = this.translate.instant("menu_code.texto");
      this.seg_1 = this.translate.instant("menu_code.seg_1");
      this.seg_2 = this.translate.instant("menu_code.seg_2");
      this.seg_3 = this.translate.instant("menu_code.seg_3");
      this.menu_1 = this.translate.instant("menu_code.menu_1");
      this.menu_2 = this.translate.instant("menu_code.menu_2");
      this.menu_3 = this.translate.instant("menu_code.menu_3");
      this.menu_4 = this.translate.instant("menu_code.menu_4");
      this.titulo_lang = this.translate.instant("titulo.titulo");
      this.descricao_lang = this.translate.instant("titulo.descricao");
      this.senha = this.translate.instant("titulo.senha");
      this.ativa_senha = this.translate.instant("titulo.ativa_senha");
      this.campo = this.translate.instant("link.campo");
      this.ativar_lik = this.translate.instant("link.ativar_lik");
      this.btn_publicar = this.translate.instant("default.btn_publicar");
      this.btn_enviar = this.translate.instant("push.btn_enviar");
      this.campo_1 = this.translate.instant("push.campo_1");
      this.campo_2 = this.translate.instant("push.campo_2");
      this.texto_push = this.translate.instant("push.texto");
      this.load_enviando = this.translate.instant("default.load_enviando");
      this.aviso = this.translate.instant("default.aviso");
      this.msg_aviso = this.translate.instant("default.msg_aviso");
      this.arq_invalido = this.translate.instant("default.arq_invalido");
      this.arq_msg = this.translate.instant("default.arq_msg");
      this.msg_exlcuir = this.translate.instant("default.msg_exlcuir");
      this.page_doc = this.translate.instant("default.page_doc");
      this.btn_excluir = this.translate.instant("default.btn_excluir");


    }, 250);
  }

  resize() {
    // this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }
  //trocar o slide de acordo com o segment

  getShowCode() {

    // this.util.showLoading(this.load_aguarde);
    this.codeProvider.getShowCode(this.id_code)
      .then(
        async (result: any) => {
          this.tools.dismissAll();
          console.log("result em menu-code.ts: ", result);
          if (result.status == 200) {
            //popula todas a variaveis
            this.titulo = result.data[0]['titulo'];
            this.modelG.titulo = this.titulo;
            this.code = result.data[0]['code'];
            this.nome_page = this.code ? this.code.toUpperCase() + " | (Painel)" : 'Painel';
            this.modelC.name = this.code;
            this.link = result.data[0]['link'];
            this.slug = result.data[0]['slug'];

            if (result.data[0].t_conteudo == 2) {
              console.log('SIM, é um link');
              this.meu_link = true;
            } else {
              console.log('NÃO é um link');
              this.meu_link = false;
            }

            this.descricao = result.data[0]['descricao'];
            this.user_info = result.data[0]['user_info'];
            this.modelG.descricao = this.descricao;
            this.contato.pais = result.data[0]['pais'];
            this.contato.email = result.data[0]['email'];
            this.contato.website = result.data[0]['website'];
            this.contato.facebook = result.data[0]['facebookUser'];
            this.contato.instagram = result.data[0]['instagramUser'];
            this.contato.linkedin = result.data[0]['linkedin'];
            this.vid_aux = result.data[0]['album_vimeo'];
            this.docs = result.data[0]['documento'];
            this.imagens = result.data[0]['galeria'];
            this.modelG.isprivate = result.data[0]['isprivate'];
            this.modelG.password = result.data[0].password;
            this.password = result.data[0].password;
            this.t_conteudo = result.data[0]['t_conteudo'];
            this.card = result.data[0]['card'];
            this.slug = result.data[0]['slug'];
            //retirar a mascara do telefone
            if (result.data[0]['tel_contato'] != "") {
              var str = result.data[0]['tel_contato'];
              this.contato.telefone = str.replace(this.word, '');
            } else {
              this.contato.telefone = null;
            }
            //retirando a máscara do telefone
            if (result.data[0]['tel_whatsapp'] != "") {
              var newstr = result.data[0]['tel_whatsapp'];
              this.contato.whatsapp = newstr.replace(this.word, '');

            } else {
              this.contato.whatsapp = null;
            }

          } else {

            const toast = await this.toast.create({ message: this.msg_erro, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' });
            toast.present();

          }

        }, async (error: any) => {

          const toast = await this.toast.create({ message: this.msg_servidor, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' });
          toast.present();
          this.tools.dismissAll();
          // this.router.navigate(['/inicio']);
        });


  }
  showPromptPush() {
    let data = {
      codeNumber: this.code,
      lang: this.lang,
      token: this.token,
      texto_push: this.texto_push,
      campo_1: this.campo_1,
      campo_2: this.campo_2,
      btn_enviar: this.btn_enviar,
      btn_cancelar: this.btn_cancelar,
      msg_servidor: this.msg_servidor,
      load_aguarde: this.load_aguarde,
      campo_obrigatorio: this.campo_obrigatorio
    };

    console.log('Dados para enviar no push: ', data);
    this.router.navigate(['/notificacao-push', data]);


  }

  async ShowContato() {

    alert('lista de Contatos no ShowContato');
    // const myModal = await this.modalCtrl.create('ContatoListPage', { contato: this.contato, token: this.token, code_id: this.id_code, lang: this.lang });
    // myModal.present();
    //this.navCtrl.push('ContatoListPage', {contato:this.contato,token:this.token,code_id:this.id_code });
  }

  ShowContato2() {
    let sendData = { contato: this.contato, token: this.token, code_id: this.id_code, lang: this.lang };
    this.router.navigate(['/contato-code', sendData]);
    // this.navCtrl.push('ContatoCodePage', { contato: this.contato, token: this.token, code_id: this.id_code, lang: this.lang });
  }

  ShowCam(part: number = null) {
    let sendData = { part: part, imagens: this.imagens, token: this.token, code: this.id_code, package_imagens: this.package_imagens, package_name: this.package_name, lang: this.lang };
    this.router.navigate(['/image-code', sendData]);

    // this.navCtrl.push('ImageCodePage', { part: part, imagens: this.imagens, token: this.token, code: this.id_code, package_imagens: this.package_imagens, package_name: this.package_name, lang: this.lang });

  }
  ShowDoc() {
    let sendData = { docs: this.docs, token: this.token, code: this.id_code, load_aguarde: this.load_aguarde, btn_cancelar: this.btn_cancelar, btn_excluir: this.btn_excluir, btn_publicar: this.btn_publicar, page: this.page_doc, msg_exlcuir: this.msg_exlcuir, load_enviando: this.load_enviando, msg_servidor: this.msg_servidor, aviso: this.aviso, arq_msg: this.arq_msg, arq_invalido: this.arq_invalido, lang: this.lang };
    this.router.navigate(['/documento-code', sendData]);
    // this.navCtrl.push('DocumentoCodePage', { docs: this.docs, token: this.token, code: this.id_code, load_aguarde: this.load_aguarde, btn_cancelar: this.btn_cancelar, btn_excluir: this.btn_excluir, btn_publicar: this.btn_publicar, page: this.page_doc, msg_exlcuir: this.msg_exlcuir, load_enviando: this.load_enviando, msg_servidor: this.msg_servidor, aviso: this.aviso, arq_msg: this.arq_msg, arq_invalido: this.arq_invalido, lang: this.lang });
  }

  ShowVideo(action) {
    ///escolhe pra onde direcionar
    let page: string;
    if (action == 'video') {
      page = 'VideoListPage';
    } else {
      page = 'AudioListPage';
    }

    let sendData = { videos: this.vid_aux, token: this.token, code: this.id_code, package_videos: this.package_videos, package_name: this.package_name, package_imagens: this.package_imagens, lang: this.lang };
    this.router.navigate([page, sendData]);
    // this.navCtrl.push(page, { videos: this.vid_aux, token: this.token, code: this.id_code, package_videos: this.package_videos, package_name: this.package_name, package_imagens: this.package_imagens, lang: this.lang });

  }
  // "Edição do code,titulo,descrição,link,t_conteudo",
  editCode() {
    console.log('Dados do model enviados: ', this.model);

    this.util.showLoading(this.load_aguarde);
    this.codeProvider.code_Edit(this.token, this.id_code, this.modelC.name, this.modelG.titulo, this.modelG.descricao, this.model.link, this.meu_link, this.modelG.password, this.modelG.isprivate)
      .then(
        async (result: any) => {
          console.log('Retorno do Servidor: ', result)
          this.tools.dismissAll();
          if (result.status == 200) {

            const toast = await this.toast.create({ message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'sucesso' });
            toast.present();

          } else if (result.status == 403) {

            const toast = await this.toast.create({ message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' });
            toast.present();
            this.router.navigate(['/login', { lang: this.lang }]);

            // this.navCtrl.setRoot('LoginPage', { lang: this.lang });
          }

        }
        , async (error: any) => {
          const toast = await this.toast.create({ message: this.msg_servidor, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' });
          toast.present();
          this.tools.dismissAll();
          this.router.navigate(['/inicio', { lang: this.lang }]);
          // this.navCtrl.setRoot('HomePage');
        });


  }

  // sistema de envio de push

  postPushHotspot(playerData) {
    let action;
    if (playerData.action) {
      action = playerData.action;
    } else {
      action = 'open_form';
    }
    switch (action) {
      case 'send_push':
        console.log('Enviando push para: ', playerData.hotspot);
        console.log('Dados: ', playerData.data);
        break;

      case 'open_form':
        console.log('Abrindo formulário: ');
        this.getFormPush(playerData);
        break;

      default:
        break;
    }
  }

  async getFormPush(playerData = null) {
    let dadosRecebidos = playerData;
    let alert = await this.alertCtrl.create({
      subHeader: 'Enviar notificação para: ' + playerData.data.nome,
      message: this.messages.error,
      inputs: [
        {
          name: 'title',
          placeholder: 'Titulo da Mensagem'
        },
        {
          name: 'message',
          placeholder: 'Mensagem',

        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            let error = null;
            if (!data.title) {
              error = '<Digite class="error">* Digite um titulo</span>';
            }
            else if (!data.message) {
              error = '<span class="error">* Digite uma mensagem</span>';
            }
            if (error) {
              this.showAlert(error);
            }

            if (!error) {
              // logged in!
              console.log('enviando...');
              /**
               * infoData segue o padrao:
               * data: {
               * url: 'http://restfull.site.com?params',
               * method: 'post|get|delete'
               * data: Object
               * }
               */
              let infoData = {
                url: 'https://kscode.com.br/ksc_2020/wp-json/hotspot/v1/push',
                method: 'post',
                header: { Authorization: 'Bearer ' + this.token },
                data: {
                  push: data,
                  code_name: this.code,
                  code_id: this.id_code,
                  hotspot: dadosRecebidos
                },

              };

              this.httpPadrao(infoData);

            } else {
              // invalid login
              console.log('Erro ao enviar!');
              return false;
            }

          }
        }
      ]
    });
    alert.present();
  }

  setHotSpotApi(action) {

    if (action == 'get_users') {
      this.hotspotConditions = true;
    }

    let info = this.hotSpotForm.value;
    console.log('Dados do hotSpotForm enviados: ', info);
    let data = {
      token: this.token,
      id_code: this.id_code,
      action: action,
      data: info
    }

    this.util.showLoading(this.load_aguarde);

    this.codeProvider.setHotSpot(data)
      .then(
        async (result: any) => {
          console.log('Retorno de dados do hotspot vindo do Servidor: ', result)
          this.tools.dismissAll();
          if (result.status == 200) {

            // tratando dados retornado do servidor
            let DataHotspot = result.hotspot.data;
            if (result.action == 'get_users') {
              this.hotspotuserInfo = DataHotspot;
            }

            if (DataHotspot) {

              action = {
                action: 'config',
                data: DataHotspot,
              };

              this.setActionHotSpot(action);
            }

            const toast = await this.toast.create({ message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'sucesso' });
            toast.present();
          }

          else if (result.status == 404) {

            this.hotSpotForm.isHotspotActive = false;
            this.hotSpotForm.isOnlyHotspot = false;
            this.hotSpotForm.isRegisterScreen = false;
            this.hotSpotForm.password = null;

            this.searchWifi();

          }

          else if (result.status == 403) {
            const toast = await this.toast.create({ message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' });
            toast.present();
            this.router.navigate(['/login']);
            // this.navCtrl.setRoot('LoginPage', { lang: this.lang });
          }

        }
        , async (error: any) => {
          const toast = await this.toast.create({ message: this.msg_servidor, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' });
          toast.present();
          this.tools.dismissAll();
          this.router.navigate(['/inicio']);
          // this.navCtrl.setRoot('HomePage');
        });


  }

  setActionHotSpot(action) {

    console.log('Dados recebidos na função setHotSpot: ', action);
    let ssid = '';
    let data = action;

    if (data.action) {
      action = data.action;
      ssid = data.ssid;
      this.hotSpotForm.password = ssid;
    }

    switch (action) {
      case 'active':

        let togleValue = this.hotSpotForm.value;

        console.log('Status do Hotspot', togleValue);

        break;
      case 'detail_user':

        let player_id = data.player_id;
        console.log('Status do OLD Hotspot', this.sectorUser, ':: player_id: ', player_id);
        if (player_id == this.sectorUser) {
          this.sectorUser = null;
        } else {
          this.sectorUser = player_id;
        }

        console.log('Status do New Hotspot', this.sectorUser, ':: player_id: ', player_id);
        break;
      case 'hiddeInfo':

        this.hotspotConditions = false;

        break;
      case 'send':
        this.setHotSpotApi('set');
        console.log('Dados do Hotspot no send da função setHotSpot: ', this.hotSpotForm.value);
        break;
      case 'password':
        console.log('Password do Hotspot');
        this.setConfigHotspot(ssid);
        this.hotSpotForm.password = '';

        break;
      case 'config':

        console.log('Config automático do Hotspot');
        let dataHotspot = data.data;
        console.log('Config automático do Hotspot,', dataHotspot);
        this.hotSpotForm.ssid = dataHotspot.ssid;
        this.hotSpotForm.password = dataHotspot.password;
        this.hotSpotForm.isHotspotActive = dataHotspot.isHotspotActive;
        this.hotSpotForm.isOnlyHotspot = dataHotspot.isOnlyHotspot;
        this.hotSpotForm.isRegisterScreen = dataHotspot.isRegisterScreen;
        this.isWifiSelected = true;

        console.log('SSID: ', dataHotspot.ssid);
        console.log('password: ', dataHotspot.password);
        // this.setConfigHotspot(ssid);

        break;

      default:
        break;
    }

  }

  conectHotspot() {

    this.inSearch = true;
    console.log('Conectando com a rede wi-fi...');
    let data = {
      ssid: this.hotSpotForm.ssid,
      password: this.hotSpotForm.password
    }

    this.hotspot.removeWifiNetwork(data.ssid).then((rem) => {

      console.log('Disconectando da rede: ', rem);

      this.hotspot.connectToWifi(data.ssid, data.password).then((res) => {

        this.inSearch = false;
        this.isConnected = 1;
        console.log('Success | Response of conection wifi: ', res);


      }, (error) => {

        this.inSearch = false;
        this.isConnected = 3;
        console.log('Erro ao conectar (wifi): ', error);
      });
    });

  }
  searchWifi() {

    this.isWifiSelected = false;
    this.inSearch = true;
    this.platform.ready().then(() => {

      console.log('Buscando redes');
      this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
        console.log(networks);
        this.networks = networks;
        this.inSearch = false;

      });

    })

  }

  setConfigHotspot(ssid) {
    this.isWifiSelected = true;
    this.hotSpotForm.password = ssid;
    this.hotSpotForm.ssid = ssid;

    console.log('Rede selecionada em setConfigHotspot: ', this.hotSpotForm.ssid);

  }

  changeSegment(item: any) {

    this.segment = item;

    if (item == 4) {

      this.setHotSpotApi('get');

    }

  }

  change_segmento() {

    this.meu_link = this.model.isLink;

    console.log('Status do conteúdo (link): ', this.meu_link);

  }

  change_senha(item) {

    this.modelG.isprivate = item;

  }
  // compartilhar social share
  shareSheetShare() {
    let user_info = this.user_info;
    console.log('Dados do usuário em shareSheetShare: ', user_info.name);
    this.card = this.imagens[0].img_link;
    console.log('link do card: ', this.card, this.slug);
    this.socialSharing.share(user_info.intro, "Share subject", user_info.card, user_info.link).then(() => {
      console.log("shareSheetShare: Success");
    }).catch(() => {
      console.error("shareSheetShare: failed");
    });

  }

  async showAlert(message) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: [{
        text: 'OK',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }
      ]
    });
    alert.present();
  }

  httpPadrao(infoData) {
    /**
     * infoData segue o padrao:
     * data: {
     * url: 'http://restfull.site.com?params',
     * method: 'post|get|delete'
     * data: Object
     * }
     */
    console.log('Dados enviados no httPadrao:: ', infoData);

    this.util.showLoading(this.load_aguarde);

    this.codeProvider.setHttpPadrao(infoData)
      .then(
        async (result: any) => {
          console.log('Retorno de dados do Servidor em httpPadrao: ', result.data);
          let response = JSON.parse(result.data);

          this.tools.dismissAll();
          if (response.status == 200) {

            const toast = await this.toast.create({ message: response.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'sucesso' });
            toast.present();
          }
          else if (response.status == 403) {

            const toast = await this.toast.create({ message: response.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' });
            toast.present();
            this.router.navigate(['/login']);
            // this.navCtrl.setRoot('LoginPage', { lang: this.lang });
          }

        }, async (error: any) => {

          const toast = await this.toast.create({ message: this.msg_servidor, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' });
          toast.present();
          this.tools.dismissAll();
        });
  }

}

export class Link {
  link: String;
  isLink: String;
  isprivate: any;
}
export class geral {
  titulo: String;
  descricao: String;
  password: String;
  isprivate: Boolean;
}
export class Code {
  name: String;
}
export class Messages {
  error: any;
  success: any;
}
export class UserInfoData {
  name: string;
  email: string;
  intro: string;
  card: string;
  link: string;
}
