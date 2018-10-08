import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AppMainComponent} from './shared/app-main/app-main.component';
import {TirillaComponent} from './tirilla/tirilla.component';
import {DetailComponent} from './tirilla/detail.component';
import {VacacionesComponent} from './vacaciones/listar.component';
import {CesantiasComponent} from './cesantias/listar.component';
import {PrimasComponent} from './primas/listar.component';
import {VacacionesdetailComponent} from './vacaciones/detail.component';
import {CesantiasdetailComponent} from './cesantias/detail.component';
import {PrimasdetailComponent} from './primas/detail.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './_services/auth.guard.service';

const routes = [
  // App routes goes here here
  {
    path: '', component: AppMainComponent,
    children: [
      {path: '', component: TirillaComponent, canActivate: [AuthGuard]},
      {path: 'dashboard', component: TirillaComponent, canActivate: [AuthGuard]},
      {path: 'tirillas', component: TirillaComponent, canActivate: [AuthGuard]},
      {path: 'tirillas/detalle/:id', component: DetailComponent, canActivate: [AuthGuard]},
      {path: 'primas', component: PrimasComponent, canActivate: [AuthGuard]},
      {path: 'primas/detalle/:id', component: PrimasdetailComponent, canActivate: [AuthGuard]},
      {path: 'cesantias', component: CesantiasComponent, canActivate: [AuthGuard]},
      {path: 'cesantias/detalle/:id', component: CesantiasdetailComponent, canActivate: [AuthGuard]},
      {path: 'vacaciones', component: VacacionesComponent, canActivate: [AuthGuard]},
      {path: 'vacaciones/detalle/:id', component: VacacionesdetailComponent, canActivate: [AuthGuard]},
      {path: 'perfil', component: ProfileComponent, canActivate: [AuthGuard]}
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
