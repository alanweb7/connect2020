import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { GetData, MiscService } from 'src/app/services/tools/misc.service';
import { ApiService } from 'src/app/services/api/api.service';

// services

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  public codeScan: any;
  public responseQR: any;
  public responseApi: any = {};
  public messageStyle;

  constructor(
    private activatedRoute: ActivatedRoute,
    private qrScanner: QRScanner,
    private getdata: GetData,
    private api: ApiService,
    private tools: MiscService,
    private router: Router,
    private zone: NgZone
  ) {

    // let value = navParams.get('item');

  }

  ngOnInit() {

    this.qrscanner();
    let myId = this.activatedRoute.snapshot.paramMap.get('id');

    console.log('Meu id recebido: ', myId);
  }


  qrscanner() {

    // Optionally request the permission early
    this.qrScanner.prepare()
      .then(async (status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log('authorized');

          // start scanning
          let scanSub = await this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.getdata.getBaseName(text).then((data) => {

              console.log('Code escaneado na funcao qrcode.page: ', data);

              if (data.status == 200) {
                
                this.api.getCode(data.code).then((res) => {

                  console.log('dados do code escaneado em qrcode.page: ', res);

                  if (res.status !== 200) {

                    this.messageStyle = {
                      'color': 'red'
                    };
                    this.responseApi = res;

                  }

                  if (res.status == 200) {
                    this.responseQR = res;
                    this.zone.run(async () => {
                      await this.tools.presentLoading();
                      await this.router.navigate(['/detalhe-code']);
                    });
                  }


                });

              }

            });






            // alert('O código não corresponde a nenhum canal Connect. \n\n Código do QR: '+ JSON.stringify(data));

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            return text;
          });
          // show camera preview

          window.document.querySelector('ion-app').classList.add('transparentBody');
          this.qrScanner.show();

          this.qrScanner.resumePreview();

          // show camera preview
          this.qrScanner.show()
            .then((data: QRScannerStatus) => {
              console.log('funcao this.qrScanner:: ', data.showing);
            }, err => {
              alert(err);

            });

          // wait for user to scan something, then the observable callback will be called

        } else if (status.denied) {
          alert('bloqueado');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
          alert('else');
        }
      })
      .catch((e: any) => {
        alert('Error is' + e);
      });

  }

}
