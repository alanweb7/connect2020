import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// modulos migrados
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
// import { ModalDetailPage } from './../app/pages/modal-detail/modal-detail';

import { MediaCapture } from '@ionic-native/media-capture/ngx';

// Import Native

import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { FTP } from '@ionic-native/ftp/ngx';
import { Media } from '@ionic-native/media/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { VideoEditor } from '@ionic-native/video-editor/ngx';
import { Hotspot } from '@ionic-native/hotspot/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { File } from '@ionic-native/file/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

// import { IonicStorageModule } from '@ionic/storage';
// import { AngularFireModule } from "angularfire2";
// import { FIREBASE_CONFIG } from './firebase.config';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
// import services
import { AuthGuard } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
//import provider
import { ClienteProvider } from '../app/providers/cliente/cliente';
import { SqliteHelperService } from '../app/providers/sqlite-helper/sqlite-helper.service';
import { CodeProvider } from '../app/providers/code/code';
import { ConnectProvider } from './services/code/code';
import { NetworkProvider } from '../app/providers/network/network';
import { UsuarioService } from '../app/providers/movie/usuario.service';
import { AdminToolsDb, AdminToolsRest } from '../app/providers/admin-tools/admin-tools';
import { UtilService } from '../app/providers/util/util.service';
import { Autosize } from '../app/directives/autosize/autosize';
import { ProgressBarComponent } from '../app/components/progress-bar/progress-bar';
import { GeolocationProvider } from '../app/providers/geolocation/geolocation';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Keyboard } from '@ionic-native/keyboard/ngx';
// import { FileUploadModule } from 'ng2-file-upload';

import { Storage } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    PhotoViewer,
    AuthGuard,
    AuthenticationService,
    QRScanner,
    Keyboard,
    ClienteProvider,
    OneSignal,
    WebView,
    Clipboard,
    Facebook,
    AdminToolsDb,
    AdminToolsRest,
    LocationAccuracy,
    Hotspot,
    VideoEditor,
    StreamingMedia,
    Chooser,
    Crop,
    CallNumber,
    NativeAudio,
    Media,
    HTTP,
    FTP,
    MediaCapture,
    Camera,
    SQLite,
    NativeStorage,
    SqliteHelperService,
    CodeProvider,
    ConnectProvider,
    Geolocation,
    Deeplinks,
    Base64,
    SocialSharing,
    BrowserTab,
    File,
    Network,
    NetworkProvider,
    StatusBar,
    SplashScreen,
    UsuarioService,
    UtilService,
    Diagnostic,
    GeolocationProvider,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
