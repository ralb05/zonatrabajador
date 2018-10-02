import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppMainComponent} from './shared/app-main/app-main.component';
import {TirillaComponent} from './tirilla/tirilla.component';
import {DetailComponent} from './tirilla/detail.component';

const routes = [
  // App routes goes here here
  {
    path: '', component: AppMainComponent,
    children: [
      {path: '', component: TirillaComponent},
      {path: 'dashboard', component: TirillaComponent},
      {path: 'tirillas', component: TirillaComponent},
      {path: 'tirillas/detalle/:id', component: DetailComponent},
      {path: 'perfil', component: TirillaComponent}
    ]
  },
  //no layout routes
  {path: 'login', component: LoginComponent},
  {path: 'login/:id/:token', component: LoginComponent}

];

@NgModule({
            imports: [
              RouterModule.forRoot(routes)
            ],
            exports: [RouterModule]
          })
export class AppRoutingModule {
}
