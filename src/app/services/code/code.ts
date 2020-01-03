import { HTTP } from '@ionic-native/http/ngx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { stringify } from 'querystring';
@Injectable()
export class ConnectProvider {
  public myGlobalVar: string;
  private API_URL = 'https://kscode.com.br/ksc_2020/wp-json/code/search/'
  private API_IMG_URL = 'https://kscode.com.br/ksc_2019/wp-content/uploads/formidable/'
  private APP_URL = 'https://kscode.com.br/ksc_2020/wp-json/code/search/?code_number=pesquisa777'
  private APP_URL_CODE = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/users/codes'
  private APP_URL_ENQ = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/ask'

  constructor(
    public http: HttpClient,
    public httpn: HTTP,
  ) { }

  async getAll(code: any, phoneNumber: String, latitude: String, longitude: String) {

    let url = this.API_URL + '?code_number=' + code + '&phone=' + phoneNumber + '&latitude=' + latitude + '&longitude=' + longitude;
    let result = await this.httpn.get(url, {}, {}).then((res) => {
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
  }
  async setlinkimage(token, setData, lang) {

    console.log('setData original em setlinkimage em codeProvider:: ', setData);

    let url = this.APP_URL_CODE;
    let id_code = setData.id;
    console.log('id_code original em setlinkimage em codeProvider:: ', id_code);
    let data = {
      'id': id_code,
      'token': token,
      'setData': JSON.stringify(setData),
      'lang': lang,
      'bloco': 11
    };

    let result = await this.httpn.post(url, data, {}).then((res) => {
      let response = JSON.parse(res.data);
      console.log('response em setlinkimage:: ', response);
      return response;
    }).catch((err: any) => {
      let erroStatus = err.status;
      let response = {
        'error': 'ocorreu_um_erro',
        'status': erroStatus,
      };
      console.log('Erro em setlinkimage:: ', err);
      console.log('result em setlinkimage:: ', result);
      return response;
    });
    return result;
  }

  async code_remove(token: String, id_code: Number, lang: String) {
    let url = this.APP_URL_CODE + '?token=' + token + '&bloco=1&id=' + id_code + '&lang=' + lang;
    let result = await this.httpn.delete(url, {}, {}).then((res) => {
      console.log('resultado dos contatos code.ts: ', res);
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
    // return this.http.delete(url).map((resp: Response) => resp.json());
  }
  async code_create(token: String, name_code: String, link: String, t_conteudo: String, lang: String) {
    var data = {
      code: name_code,
      link: link,
      t_conteudo: t_conteudo,
      token: token,
      lang: lang
    };
    let url = this.APP_URL_CODE;
    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado dos contatos code.ts: ', res);
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
    // return this.http.post(url, data).map((resp: Response) => resp.json());
  }
  get_API_IMG_URL(): String {
    return this.API_IMG_URL;
  }
  //edição de code
  async getAllCode(token: String) {
    let url = this.APP_URL_CODE + '?token=' + token;
    let result = await this.httpn.get(url, {}, {}).then((res) => {
      console.log('resultado do getAllCode code.ts MEUS CODES: ', res);
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
  }

  async getShowCode(code: String) {
    let url = this.API_URL + "?code=" + code;
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
  }

  async getLinks(page: any) {
    let url = this.APP_URL;
    let result = await this.httpn.post(url, {}, {}).then((res) => {
      console.log('resultado dos contatos code.ts: ', res);
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
  async getCodePassword(password: String, id: Number, lang: String) {
    var data = {
      password: password,
      id: id,
      bloco: 1,
      lang: lang
    }
    let url = this.APP_URL_CODE;
    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado dos contatos code.ts: ', res);
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
    // return this.http.post(url, data).map((resp: Response) => resp.json());
  }
  async code_Edit(token: String, id_code: Number, name_code: String, titulo?: String, descricao?: String, link?: String, isLink?: String, password?: String, isprivate?: Boolean, lang?: String) {
    var data = {
      id: id_code,
      bloco: 1,
      token: token,
      code: name_code,
      titulo: titulo,
      descricao: descricao,
      link: link,
      t_conteudo: isLink,
      password: password,
      isprivate: isprivate,
      lang: lang

    };

    let url = this.APP_URL_CODE;
    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado dos contatos code.ts: ', res);
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
    // return this.http.post(url, data).map((resp: Response) => resp.json());
  }

  async setHotSpot(rec) {
    console.log('dados recebidos no provider setHotSpot: ', rec);
    let data: object;
    let url: string;
    if (rec.action == 'search_adress') {
      data = {};
      url = rec.url_api;
    }
    else {
      url = this.APP_URL_CODE;
      data = {
        token: rec.token,
        id: rec.id_code,
        action: rec.action,
        player_id: rec.player_id,
        data: rec.data,
        bloco: 16,
      };
    }

    if (rec.action == 'set_user') {
      url = 'https://kscode.com.br/ksc_2020/wp-json/hotspot/v1/users';
    };

    // let data = rec;
    // data.bloco = '16';
    console.log('dados para o servidor (setHotSpot): ', data);
    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado da API do hotspot code.ts: ', res);
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
    // return this.http.post(url, data).map((resp: Response) => resp.json());
  }

  async contato(id_code: String, token: String, setor: String, tipo: String, calling_code: String, pais: String, conteudo: String, titulo: String, action: String, sector_id: String, lang: String) {
    console.log(id_code, token, pais, setor, tipo, pais, conteudo, titulo, action, sector_id);
    var data = {
      id: id_code,
      bloco: 2,
      token: token,
      pais: pais,
      setor: setor,
      tipo: tipo,
      conteudo: conteudo,
      titulo: titulo,
      calling_code: calling_code,
      action: action,
      sector_id: sector_id,
      lang: lang

    };
    let url = this.APP_URL_CODE;

    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado dos contatos code.ts: ', res);
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

    // return this.http.post(url, data).map((resp: Response) => resp.json());
  }
  async contato_Edit(id_code: Number, token: String, pais?: String, tel_whatsapp?: String, tel_contato?: String, email?: String, website?: String, facebookUser?: String, instagramUser?: String, linkedin?: String) {
    console.log(id_code, token, pais, tel_whatsapp, tel_contato, email);
    var data = {
      id: id_code,
      bloco: 1,
      token: token,
      pais: pais,
      tel_whatsapp: tel_whatsapp,
      tel_contato: tel_contato,
      email: email,
      website: website,
      facebookUser: facebookUser,
      instagramUser: instagramUser,
      linkedin: linkedin,
    };
    let url = this.APP_URL_CODE;
    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado dos contatos code.ts: ', res);
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
    // return this.http.post(url, data).map((resp: Response) => resp.json());
  }
  ///mídias
  async imagen_create(id_code: Number, token: String, files: any[], lang: String) {
    let data = {
      id: id_code,
      bloco: 3,
      token: token,
      lang: lang,
      files: JSON.stringify(files)
    }
    let url = this.APP_URL_CODE;
    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado dos contatos code.ts: ', res);
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
    // return this.http.post(url, data).map((resp: Response) => resp.json());
  }
  async imagen_delete(token: String, id_code: Number, lang: String) {
    let url = this.APP_URL_CODE + '?token=' + token + '&bloco=3&id=' + id_code + '&lang=' + lang;
    let result = await this.httpn.delete(url, {}, {}).then((res) => {
      console.log('resultado dos contatos code.ts: ', res);
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
    // return this.http.delete(url).map((resp: Response) => resp.json());
  }

  async doc_create(id_code: Number, token: String, files: any[], lang: String) {
    let data = {
      id: id_code,
      bloco: 4,
      token: token,
      lang: lang,
      files: JSON.stringify(files)
    }
    let url = this.APP_URL_CODE;
    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado dos contatos code.ts: ', res);
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
    // return this.http.post(url, data).map((resp: Response) => resp.json());
  }
  async doc_delete(token: String, id_code: Number, lang: String) {
    let url = this.APP_URL_CODE + '?token=' + token + '&bloco=4&id=' + id_code + '&lang=' + lang;
    let result = await this.httpn.delete(url, {}, {}).then((res) => {
      console.log('resultado dos contatos code.ts: ', res);
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
    // return this.http.delete(url).map((resp: Response) => resp.json());
  }

  async video_create(id_code: Number, token: String, files: any[], lang: String) {
    let data = {
      id: id_code,
      bloco: 5,
      token: token,
      lang: lang,
      files: JSON.stringify(files)
    }
    let url = this.APP_URL_CODE;
    let result = await this.httpn.delete(url, {}, {}).then((res) => {
      console.log('delete video create code.ts: ', res);
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
    // return this.http.post(url, data).map((resp: Response) => resp.json());
  }

  async video_create_ftp(id_code: Number, token: String, files: String) {
    let data = {
      id: id_code,
      bloco: 8,
      token: token,
      files: files
    }
    let url = this.APP_URL_CODE;
    let result = await this.httpn.delete(url, {}, {}).then((res) => {
      console.log('delete video_create_ftp code.ts: ', res);
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
    // return this.http.post(url, data).map((resp: Response) => resp.json());
  }
  async video_link_create(id_code: Number, token: String, files: String, origem: String, lang: String) {
    let data = {
      id: id_code,
      bloco: 6,
      token: token,
      files: files,
      origem: origem,
      lang: lang
    }
    let url = this.APP_URL_CODE;

    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado audio-list.ts: ', res);
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
    // return this.http.post(url, data).map((resp: Response) => resp.json());
  }
  ///delete video
  async video_delete(token: String, id_code: Number, lang: String) {
    let url = this.APP_URL_CODE + '?token=' + token + '&bloco=5&id=' + id_code + '&lang=' + lang;
    let result = await this.httpn.delete(url, {}, {}).then((res) => {
      console.log('delete video code.ts: ', res);
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
    // return this.http.delete(url).map((resp: Response) => resp.json());
  }
  ///delete audio
  async audio_delete(token: String, id_code: Number, lang: String) {
    let url = this.APP_URL_CODE + '?token=' + token + '&bloco=5&media=audio&id=' + id_code + '&lang=' + lang;
    let result = await this.httpn.delete(url, {}, {}).then((res) => {
      console.log('delete audio code.ts: ', res);
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
    // return this.http.delete(url).map((resp: Response) => resp.json());
  }

  async create_push(codeNumber: String, titulo: String, mensagem: String, token: String, lang: String) {
    console.log('dados do push em code provider create_push: ',codeNumber, titulo, mensagem, token);
    let data = {
      codeNumber: codeNumber,
      titulo: titulo,
      mensagem: mensagem,
      token: token,
      password: "@spot2020",
      lang: lang

    };

    console.log(data);
    let url = 'https://kscode.com.br/ksc_2020/wp-json/admin/v1/dashboard/';
    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado dos contatos notificacao-push.ts: ', res);
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
    // return this.http.post(url, data).map((resp: Response) => resp.json());
  }

  /////Aqui fica a parte da enquete do code /////////////////////////////////
 
  async forgotpass(email: String, lang: String) {
    var data = {
      lost_pass: true,
      user_login: email,
      lang: lang

    }
    console.log(data);
    let url = this.APP_URL_CODE;
    let result = await this.httpn.post(url, data, {}).then((res) => {
      console.log('resultado dos contatos code.ts: ', res);
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
    // return this.http.post(this.APP_URL_CODE, data).map((resp: Response) => resp.json());
  }
  search(terms) {
    return terms.debounceTime(800)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  async searchEntries(term) {

    let url = 'https://kscode.com.br/ksc_2020/wp-json/code/search/?search=search&code_number=' + term;
    // return this.http.get(url).map((resp:Response)=> resp.json());

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

  }

  async setHttpPadrao(infoData) {
    /**
     * infoData segue o padrao:
     * data: {
     * url: 'http://restfull.site.com?params',
     * method: 'post|get|delete'
     * data: Object
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
      console.log('Resultado do servidor em code.ts::::setHttpPadrao',resp)
      return resp;
    }).catch((err) => {
      console.log('Erro em setHttpPadrao ', err);
    });

    return result;

  }

}
