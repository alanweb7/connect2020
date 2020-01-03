import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    public translate: TranslateService,
    private router: Router,
  ) { }

  testeLegal() {

  }
  async presentLoading(param = null) {
    if (!param) {
      param = 'Aguarde';
    };
    const loading = await this.loadingController.create({
      message: param,
      duration: 30000
    });
    await loading.present();
  }

  /**
 * Dismiss all the pending loaders, if any
 */
  async dismissAll() {
    while (await this.loadingController.getTop() !== undefined) {
      await this.loadingController.dismiss();
    }
  }

  getTrans(terms) {
    return this.translate.instant(terms);
  }

  redirectRouter(param:any = []){
    console.log('Redirecionando a rota:', param);
    console.log('Info da rota:', this.router.url);
    console.log('Info da rota anterior:', param);
    this.router.navigateByUrl('/menu-code');
    // this.router.navigate(['/dashboard'], {skipLocationChange:false});
  }

}

@Injectable({
  providedIn: 'root'
})

export class GetMessages {

  constructor(
    public toastController: ToastController,
    private alertController: AlertController
  ) { }

  async MessageToast(options) {
    options.duration = 200;
    if (!options) {
      options.message = 'Sucesso!';
    };
    const toast = await this.toastController.create(options);
    await toast.present();
  }

  async alertMessage(param = { header: 'Confirm!', message: 'Message <strong>text</strong>!!!' }) {
    const alert = await this.alertController.create({
      header: param.header,
      message: param.message,
      buttons: ['OK']
    });

    await alert.present();
  }

}

@Injectable({
  providedIn: 'root'
})
export class GetData {

  constructor(
    private storage: NativeStorage
  ) { }
  // funcoes a partir daqui
  getParams(url = null) {
    if (!url) {
      url = "?id=07&name=Alan"
    };
    if (!url.includes('?')) {
      return url;
    }
    let parametrosDaUrl = url.split("?")[1]; // id=10&name=gustavo
    let listaDeParametros = parametrosDaUrl.split("&") // ["id=10","name=gustavo"];

    let hash: any = {}

    for (let i = 0; i < listaDeParametros.length; i++) {
      let parametro = listaDeParametros[i].split("=");
      let chave = parametro[0];
      let valor = parametro[1];
      hash[chave] = valor;
    }
    return hash;
  }
  async getBaseName(url = null) {
    if (!url) {
      url = "/vitoria"
    };
    if (!url.includes('/')) { //se não contem o termo
      return url;
    }

    let parametrosDaUrl = url.split("/"); // id=10&name=gustavo
    let code = parametrosDaUrl[parametrosDaUrl.length - 1];
    let response = {
      status: 200,
      code: code
    }

    return response;
  }
  async getUserLogged() {
    console.log('Verificando o Usuário!');

    let userData = await this.storage.getItem('USER_INFO').then((response) => {
      if (response) {
        console.log('Dados gravados: ', response);

        return { response, status: 200 };
      } else {
        return { error: 'no_user', status: 403 };
      }

    });

    return await userData.response;

  }
}

