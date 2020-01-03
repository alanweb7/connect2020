import { Component, OnInit } from '@angular/core';
import { MiscService } from 'src/app/services/tools/misc.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.page.html',
  styleUrls: ['./redirect.page.scss'],
})
export class RedirectPage implements OnInit {

  constructor(
    private redirect: MiscService,
  ) { }

  ngOnInit() {
  }

  redirectPage(){
    
  }
}
