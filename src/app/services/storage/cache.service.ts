import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(
    private nativeStorage: NativeStorage,

  ) { }

  async setCacheApi(myitem, data) {

    if (!data) {
      data = { property: 'value', anotherProperty: 'anotherValue' };
    }

    return await this.nativeStorage.setItem(myitem, data)
      .then(
        () => {
          return this.getCacheApi(myitem).then((recorded) => {


            console.log('Stored item');
            console.log('Dados gravados: ', recorded);

            return recorded;

          });


        },
        error => console.error('Error storing item', error)
      );
  }

  async getCacheApi(myitem) {

    let codeInfo = this.nativeStorage.getItem(myitem)
      .then(
        (data) => {
          return data;
        },
        error => console.error('Error storing item', error)
      );

    return codeInfo;

  }


}
