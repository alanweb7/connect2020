import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public authenticationService: AuthenticationService,
    private storage: NativeStorage,
  ) { }

  canActivate(): boolean {
    console.log('Verificando login...');
    return this.authenticationService.isAuthenticated();
  }

}