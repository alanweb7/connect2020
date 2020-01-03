import { Component, OnInit } from '@angular/core';
import { MiscService } from 'src/app/services/tools/misc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documento-code',
  templateUrl: './documento-code.page.html',
  styleUrls: ['./documento-code.page.scss'],
})
export class DocumentoCodePage implements OnInit {

  constructor(
    private redirect: MiscService,
    private router: Router

  ) {
    let info = this.router.events;
    console.log('Info router: ', info);

  }

  ngOnInit() {
  }

  redirectRouter() {
    
    let url = this.router.url;
    let param:any = {router:{url:url}};
    this.redirect.redirectRouter(param);

  }

}
