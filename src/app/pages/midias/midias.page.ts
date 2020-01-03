import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController, Platform } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
import { MiscService, GetMessages } from '../../services/tools/misc.service';
import { CodeProvider } from '../../providers/code/code';

@Component({
  selector: 'app-midias',
  templateUrl: './midias.page.html',
  styleUrls: ['./midias.page.scss'],
})
export class MidiasPage implements OnInit {

  private title_page: String;
  public headerStyle: any;
  private headerClass: any;
  private contentStyle: any;
  public infoData: any;
  public typeData: any;

  // configuracoes do hotspot
  public userHotspotForm: any;
  public emailHotspot: string;
  public passwordHotspot: string;
  public player_id: string;

  public hotspotData = new HotspotData();
  public isConnected: boolean;
  public hotSpotConnMens: string;
  public hotspotActive: boolean;
  public inConnect: boolean;
  public activeForm: boolean = false;
  public showDataWifi: boolean;
  public globalAction;

  public showAdress: boolean = false;
  public coordenates: string;
  public addresUser: object;

 

  // Data passed in by componentProps
  @Input() type: string;
  @Input() data: any;
  @Input() middleInitial: string;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private hotspot: Hotspot,
    private platform: Platform,
    private locationAccuracy: LocationAccuracy,
    private geoProv: GeolocationProvider,
    private tools: MiscService,
    private codeProvider: CodeProvider,
    private messages: GetMessages,
    
  ) {

    // this.userHotspotForm = formBuilder.group({
    //   nome: ['', ''],
    //   email: ['', ''],
    //   fone: ['', ''],
    //   idade: ['', ''],
    //   sexo: ['', ''],
    //   cidade: ['', ''],
    //   bairro: ['', ''],
    //   endereco: ['', ''],
    // });

    // componentProps can also be accessed at construction time using NavParams


    console.log(navParams.get('type'));
    this.typeData = navParams.get('type');
    this.getStyle();
  }


  ngOnInit() {
  }

  async closeModal() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
  }

  getStyle() {

    let type = this.navParams.get('type');
    this.infoData = this.navParams.get('data');
    console.log('infoData: ', this.infoData);

    let myStyle: any = {};

    if (!type) {
      type = 'Mídias';
    }

    switch (type) {
      case 'audio':
        this.headerClass = 'audio_content';

        this.headerStyle = {
          'background-image': 'url(\'../../assets/imgs/back_audio.png\')',
        };

        this.title_page = 'Coleção de Audios';

        break;
      case 'doc':
        this.title_page = 'Coleção de Documentos';
        this.headerStyle = {
          'background-image': 'url(\'../../assets/imgs/back_doc.png\')',
        };
        break;
      case 'hotspot':
        this.title_page = 'Hotspot (Wi-Fi)';

        break;
      case 'chat':
        this.title_page = 'Bate-papo do canal';
        this.headerStyle = {
          'background-image': 'url(\'../../assets/imgs/back_chat.png\')',
        };
        break;

      default:
        break;
    }

  }

  hotspotConnect() {

    console.log('Dados de conexão do hotspot no hotspotConnect: ', this.hotspotData);
    this.verifyGeolocationIsActive().then((resp) => {
      console.log('REsposta do localizador (Active): ', resp);

    }).catch((err) => {
      console.log('Erro ao ativar o localizador');
    });

    if (this.platform.is('ios')) {
      this.showDataWifi = true;
      this.activeForm = false;
      this.inConnect = true;
      this.isConnected = true;
    }

    else if (this.platform.is('android')) {

      this.hotspot.scanWifi().then((networks: Array<HotspotNetwork>) => {
        this.hotSpotConnMens = 'Conectando...';
        console.log(networks);
        console.log('Conectando a rede wi-fi');
        this.activeForm = false;
        this.inConnect = true;
        let dataHotspot = this.hotspotData;
        this.hotspot.connectToWifi(this.hotspotData.ssid, this.hotspotData.password).then((res) => {
          this.isConnected = true;
          this.hotSpotConnMens = 'Sucesso! Você está conectado.';
          console.log('Success | Response of conection wifi: ', res);

        }, (error) => {

          this.hotSpotConnMens = 'Erro! Verifique os dados da conexão e tente novamente.';
          console.log('Erro | Error of conection wifi: ', error);

        });

      }).catch((error) => {
        console.log('Erro ao buscar redes: ', error);
        this.hotSpotConnMens = 'Erro! Nenhuma rede disponível no local (Verifque se seu wi-fi está ativo).';
      });

    } //fim de platform is android

  }

  async verifyGeolocationIsActive() {

    this.platform.ready().then(() => {
      // verifique a geolocalizacao
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        // if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            console.log('Request successful');
            this.getAdsressUser();
          },
          error => console.log('Error requesting location permissions', error)
        );
        // }
      });
    });

  }
  getAdsressUser() {

    this.platform.ready().then(() => {
      this.geoProv.getGeolocation().then((resp) => {
        console.log('detalhe-code total geolocation:', resp);
        this.coordenates = resp["latitude"] + ',' + resp["longitude"];
        console.log('home geolocation: ', this.coordenates);
        this.setHotSpotApi('search_adress');
      });
    });


  }

  setHotSpotApi(action) {
    this.globalAction = action;
    console.log('Definição dos globalAction: ', this.globalAction);
    let info = this.userHotspotForm.value;
    let data: any;
    console.log('Dados do hotSpotForm enviados: ', info);
    // data = {
    //   token: this.token,
    //   id_code: this.code_id,
    //   // id_code: this.id_code,
    //   action: action,
    //   player_id: this.player_id,
    //   data: info,
    //   bloco: '16'
    // }

    if (action == 'search_adress') {
      let dataCoordenates = this.coordenates;
      data = {
        'action': 'search_adress',
        url_api: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + dataCoordenates + '&key=AIzaSyCvlHIxGDuqD4hbZP2hQ0ojfelVlQT-u1s'
      };
      console.log('Endereço pesquisado: ', data.url_api);
    };

    
    this.tools.presentLoading('Aguarde..');
   
    this.codeProvider.setHotSpot(data)
      .then(
        (result: any) => {

          this.tools.dismissAll();

          if (this.globalAction == 'search_adress' && result.status == 'OK') {

            let totalSddress = result.results[0];
            this.addresUser = totalSddress;

            this.userHotspotForm.endereco = totalSddress.formatted_address;
            this.userHotspotForm.bairro = totalSddress.address_components[2].long_name;
            this.userHotspotForm.cidade = totalSddress.address_components[3].long_name;

            console.log('Endereço Total usuário posição [0]: ', totalSddress);

          }

          if (result.status == 200 && this.globalAction == 'set_user') {
            console.log('Retorno hotspot do Servidor: ', result);
            let DataHotspot = result.hotspot.data;
            if (DataHotspot) {
              action = {
                action: 'config',
                data: DataHotspot,
              };
              // this.setActionHotSpot(action);
            }

            this.hotspotConnect();
            let options = { message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'sucesso' };
            this.messages.MessageToast(options);
          
          }
          else if (result.status == 404) {
            console.log('Response 404!');
          }

          else if (result.status == 403) {
            alert('Erro 403');
            // this.toast.create({ message: result.message, position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' }).present();
            // this.navCtrl.setRoot('LoginPage', { lang: this.lang });
          }
        }
        , (error: any) => {
          alert('Error: '+ JSON.stringify(error));
          // this.toast.create({ message: 'Error the response', position: 'bottom', duration: 3000, closeButtonText: 'Ok!', cssClass: 'error' }).present();
          // this.util.loading.dismissAll();
          // this.navCtrl.setRoot('HomePage');
        });


  }

}

export class HotspotData {
  isHotspotActive: boolean;
  isOnlyHotspot: boolean;
  isRegisterScreen: boolean;
  password: string;
  ssid: string;
}