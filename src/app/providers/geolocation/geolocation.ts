import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
@Injectable()
export class GeolocationProvider {
 lat: any;
 lng: any;
 resp:any[];
  
  constructor(private diagnostic: Diagnostic, public geo: Geolocation) {
     this.resp=[];
    
  }
  getGeolocation(){
    return this.diagnostic.isGpsLocationEnabled().then((isAvailable:any)=>{
      if(isAvailable){
        return this.geo.getCurrentPosition(null).then( pos => {
          this.lat = pos.coords.latitude;
          this.lng = pos.coords.longitude;
            this.resp['latitude']  = this.lat;
            this.resp['longitude'] = this.lng;
            this.resp['result']    = true;
            return this.resp;  
          }).catch( err => console.log(err)); 
      }else{
        this.resp['result']    = false;
        this.resp['latitude']  = "";
        this.resp['longitude'] = "";
        return this.resp;  
      }

   }).catch( err => console.log(err));
  
  }
 
 
    

}
   


