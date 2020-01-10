import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { CacheService } from '../storage/cache.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public message: any;
  private host = 'https://kscode.com.br/ksc_2020';

  constructor(
    private httpn: HTTP,
    private cache: CacheService,
    private router: Router,
  ) { }

  getTeste(text = null) {
    if (!text) {
      text = 'Nenhuma mensagem';
    }
    return text;
  }

  async getCode(code) {

    let url = this.host + '/wp-json/code/search/?code_number=' + code;
    let data = {
      url: url,
      method: 'get'
    }

    let response = await this.getApi(data).then((res) => {
      console.log('retorno do servidor: ', res);

      if (res.status == 200) {

        let response = res.data[0];
        console.log('ID do code encontrado: ', response.id);
        this.cache.setCacheApi('current-code', response).then((res) => {
          // this.router.navigate(['/detalhe-code']);
        });

      }
      return res;

    }).catch((error) => {
      console.log('Error na requisição: ', error);
      return {
        message: 'Erro na conexão com o servidor',
        status: 500,
        error
      };
    });

    return response;

  }

  async getApi(infoData = null) {
    /**
     * infoData segue o padrao:
     * data: {
     * url: 'http://restfull.site.com?params',
     * method: 'post|get|delete'
     * data: Object,
     * header: {}
     * }
     */
    let url = infoData.url;
    let method = infoData.method;
    let data = {};
    let header = {};

    if (infoData.data) {
      data = infoData.data;
    }

    if (infoData.header) {
      header = infoData.header;
    }

    let httpRest;

    switch (method) {
      case 'post':
        httpRest = this.httpn.post(url, data, header);
        break;
      case 'get':
        httpRest = this.httpn.get(url, data, header);
        break;
      case 'delete':
        httpRest = this.httpn.delete(url, data, header);
        break;

      default:
        console.log('method default no switch::');
        break;
    }

    let result = await httpRest.then((resp) => {
      // let response = JSON.parse(resp.data);
      if (resp.status == 200) {
        let data = JSON.parse(resp.data);

        console.log('Dados retornado na API padrão: ', data);
        return data;
      }

      return 'Erro em setHttpPadrao, status: ' + resp.status;

    }).catch((err) => {
      console.log('Erro em setHttpPadrao ', err);
    });

    return result;

  }

}
