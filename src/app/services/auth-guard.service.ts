import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './Authentication.service';
 
 
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
      public authenticationService: AuthenticationService
        ) {
          console.log('Verificando login...');
        }
 
    canActivate(): boolean {
      console.log('Verificando login...');
      return this.authenticationService.isAuthenticated();
    }
 
}