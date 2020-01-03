import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { Base64 } from '@ionic-native/base64/ngx';
import { File } from '@ionic-native/file/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { MiscService } from 'src/app/services/tools/misc.service';

@Injectable()
export class UtilService {
  APP_URL_PAIS = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/codes?countries=all'
  constructor(public http: HttpClient,
    public loadingCtrl: LoadingController,
    private base64: Base64,
    public file: File,
    public httpn: HTTP,
    private tools: MiscService
  ) {
    console.log('Hello UtilProvider Provider');
  }

  async getPaisALL() {
    let url = this.APP_URL_PAIS;
    let result = await this.httpn.get(url, {}, {}).then((res) => {
      console.log('resultado da pesquisa: ', res);
      let response = JSON.parse(res.data);
      return response;
    }).catch((err: any) => {
      let erroStatus = err.status;
      let response = {
        'error': 'ocorreu_um_erro',
        'status': erroStatus,
      };
      console.log('Erro em getAll:: ', err);
      console.log('result em getAll:: ', result);
      return response;
    });
    return result;
    // return this.http.get(url).map((resp:Response)=> resp.json());
  }
  createNewFileName(oldFileName: String): String {
    let extension: string = oldFileName.substr(oldFileName.lastIndexOf('.')); // .png, .jpg
    return new Date().getTime() + extension; // 1264546456.jpg
  }
  getExtension(file: String): String {
    let extension: string = file.substr(file.lastIndexOf('.')); // .png, .jpg
    return extension; // .jpg
  }

  async converterBase64(file) {

    let base64Image = await this.base64.encodeFile(file).then((base64File) => {
      return base64File;

    })
      .catch((error: Error) => console.log(`Error updating ${name} movie!`, error));

    return base64Image;
  }

  async showLoading(msg) {
    const loading = await this.loadingCtrl.create({
      message: msg,
      cssClass: "loadingInterna"
    });
    await loading.present();
  }

  async getCEP(cep) {
    let url = '  https://api.postmon.com.br/v1/cep/' + cep;
    let result = await this.httpn.get(url, {}, {}).then((res) => {
      console.log('resultado do code.ts MENU CODE: ', res);
      let response = JSON.parse(res.data);
      return response;
    }).catch((err: any) => {
      let erroStatus = err.status;
      let response = {
        'error': 'ocorreu_um_erro',
        'status': erroStatus,
      };
      console.log('Erro em getAll:: ', err);
      console.log('result em getAll:: ', result);
      return response;
    });
    return result;
    // return this.http.get(url).map((resp: Response) => resp.json());
  }

  public dismissAll() {
    this.tools.dismissAll();
  }

}
