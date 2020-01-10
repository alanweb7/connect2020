import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  // {
  //   path: 'dashboard',
  //   loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule',
  //   canActivate: [AuthGuard]
  // },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'detalhe-code',
    loadChildren: () => import('./pages/detalhe-code/detalhe-code.module').then( m => m.DetalheCodePageModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./pages/qrcode/qrcode.module').then( m => m.QrcodePageModule)
  },
  {
    path: 'modelo',
    loadChildren: () => import('./pages/modelo/modelo.module').then( m => m.ModeloPageModule)
  },
  {
    path: 'aplicacoes',
    loadChildren: () => import('./pages/aplicacoes/aplicacoes.module').then( m => m.AplicacoesPageModule)
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'dashboard',
    loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule',
    // canActivate: [AuthGuard]
  },
  {
    path: 'Logout',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'meus-codes',
    loadChildren: () => import('./pages/meus-codes/meus-codes.module').then( m => m.MeusCodesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu-code',
    loadChildren: () => import('./pages/menu-code/menu-code.module').then( m => m.MenuCodePageModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'image-code',
    loadChildren: () => import('./pages/image-code/image-code.module').then( m => m.ImageCodePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'image-add',
    loadChildren: () => import('./pages/image-add/image-add.module').then( m => m.ImageAddPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notificacao-push',
    loadChildren: () => import('./pages/notificacao-push/notificacao-push.module').then( m => m.NotificacaoPushPageModule)
  },
  {
    path: 'contato-code',
    loadChildren: () => import('./pages/contato-code/contato-code.module').then( m => m.ContatoCodePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'documento-code',
    loadChildren: () => import('./pages/documento-code/documento-code.module').then( m => m.DocumentoCodePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'video-list',
    loadChildren: () => import('./pages/video-list/video-list.module').then( m => m.VideoListPageModule)
  },
  {
    path: 'audio-list',
    loadChildren: () => import('./pages/audio-list/audio-list.module').then( m => m.AudioListPageModule)
  },
  {
    path: 'contato-list',
    loadChildren: () => import('./pages/contato-list/contato-list.module').then( m => m.ContatoListPageModule)
  },
  {
    path: 'redirect',
    loadChildren: () => import('./pages/redirect/redirect.module').then( m => m.RedirectPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
