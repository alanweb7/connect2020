import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MiscService } from 'src/app/services/tools/misc.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.page.html',
  styleUrls: ['./video-list.page.scss'],
})
export class VideoListPage implements OnInit {

  constructor(
    private router: Router,
    private navController: NavController,
    private redirect: MiscService
  ) { }

  ngOnInit() {
  }

  redirectRouter() {
    
    let url = this.router.url;
    let param:any = {router:{url:url}};
    this.redirect.redirectRouter(param);

  }
}
