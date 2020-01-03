import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/Authentication.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

// migrations
import { NavController, MenuController, ModalController, Events, ToastController, LoadingController } from '@ionic/angular';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';

//import Provider
import { ClienteProvider } from './../../providers/cliente/cliente';
import { UsuarioService } from '../../providers/movie/usuario.service';
import { NetworkProvider } from '../../providers/network/network';
import { UtilService } from '../../providers/util/util.service';
//Import Model
import { Usuario } from './../../models/usuario.model';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/lang/translate-config.service';
import { MiscService, GetMessages } from 'src/app/services/tools/misc.service';
import { ConnectProvider } from '../../../app/services/code/code';
import { empty } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //validação de formulario
  public loginFormG: FormGroup;

  public loginForm: any;
  messageEmail = "";
  messagePassword = "";
  errorEmail = false;
  errorPassword = false;
  erro = false;
  //tira a máscara
  word = /[^0-9]+/g;
  public type = 'password';
  public showPass = false;
  hiddeLogo: Boolean = true;

  data = {
    id_serv: Number,
    name: String,
    sobrenome: String,
    email: String,
    photo: String,
    tp_pessoa: String,
    cpf: String,
    cnpj: String,
    cep: String,
    endereco: String,
    numero: String,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    telefone: String,
    celular: String,
    usuario: String,
    logado: String,
    token: String
  }
  page: any;
  btn_cancelar: any;
  msg_servidor: any;
  load_enviando: any;
  load_aguarde: any;
  msg_exlcuir: any;
  btn_publicar: any;
  btn_excluir: any;
  msg_pacote: any;
  vencimento: any;
  pacote: any;
  image_name: any;
  dias: any;
  info: any;
  galeria: any;
  camera: any;
  msg_erro: any;
  msg_image: any;
  aviso: any;
  selecione: any;
  arq_selecione: any;
  lang: string;
  page_login: any;
  campo_obrigatorio: any;
  frase: any;
  senha: any;
  esqueceu: any;
  ou: any;
  conta: any;
  page_senha: any;
  texto_1: any;
  texto_2: any;
  email: string;

  constructor(
    private platform: Platform,
    private router: Router,
    private authenticationService: AuthenticationService,
    private login: AuthenticationService,

    private translate: TranslateService,
    public menu: MenuController,
    public net: NetworkProvider,
    private cli_Provider: ClienteProvider,
    private browserTab: BrowserTab,
    private events: Events,
    public toast: ToastController,
    public modalCtrl: ModalController,
    private usuario: UsuarioService,
    public loadingCtrl: LoadingController,
    public util: UtilService,
    private keyboard: Keyboard,
    private formBuilder: FormBuilder,
    public _translate: TranslateService,
    private translateConfigService: TranslateConfigService,
    private connect: ConnectProvider,
    private tools: MiscService,
    private messages: GetMessages,

  ) {

    this.platform.ready().then(() => {

      this.lang = this.translateConfigService.getDefaultLanguage();
      this._translate.setDefaultLang(this.lang);

      console.log('platform ready');
      this.authenticationService.authState.subscribe(state => {
        if (state) {
          this.router.navigate(['/dashboard']);
        }
      });
    });

    this.loginFormG = this.formBuilder.group({

      codeNumber: new FormControl('', []),
      password: new FormControl('', []),
      username: new FormControl('', []),

    });

  }

  ngOnInit() {
    console.log('enter login page ngOnInit');
  }

  actionLogin() {
    console.log(this.loginFormG.value.username);
    if (!this.loginFormG.value.username) {
      this.messages.alertMessage({ header: 'Atenção', message: 'Preencha o Usuário' });
      return false;
    }
    if (!this.loginFormG.value.password) {
      this.messages.alertMessage({ header: 'Atenção', message: 'Preencha a senha' });
      return false;
    }

    this.tools.presentLoading('Aguarde...');
    console.log('Dados do Formulário: ', this.loginFormG.value);
    let url = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/login';
    let setData = this.loginFormG.value;
    let data = {
      url: url,
      method: 'post',
      data: setData
    };

    this.connect.setHttpPadrao(data).then((response) => {
      console.log('Dados do servidor em login Page::', response);
      if(!response.data){
        return false;
      }
      let userData = JSON.parse(response.data);
      if (userData.status == 200) {
        this.events.publish('user:created', userData, Date.now());
        this.login.login(userData);
      } else {
        this.tools.dismissAll();
        alert('Erro ao tentar connectar! \n Verifique os dados e tente novamente.');
      }
    });

    // this.login.login();
  }

  async recuperarsenhaModal() {
    //   const myModal = await this.modalCtrl.create('RecuperasenhaPage',{lang:this.lang,campo_obrigatorio:this.campo_obrigatorio,page:this.page_senha,texto_1:this.texto_1,texto_2:this.texto_2,email:this.email});
    //  myModal.present();
  }

  voltar() {

    this.router.navigate(['/home']);

  }
  showPassword() {

    this.showPass = this.showPass ? false : true;
    this.type = this.showPass ? 'text' : 'password';

  }

  testeLogin() {
    let user = {
      name: 'alan'
    }
    this.events.publish('user:created', user, Date.now());
  }


}
