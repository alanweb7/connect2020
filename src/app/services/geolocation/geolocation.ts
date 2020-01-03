import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'

@Injectable()
export class GeolocationProvider {
  lat: any;
  lng: any;
  resp: any[];

  constructor(
    public geo: Geolocation
  ) {
    this.resp = [];

  }

  async getGeolocation() {



  }




}



