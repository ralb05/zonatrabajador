import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {SharedModule} from './shared/shared.module';

import {LoginComponent} from './login/login.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppMenuComponent, AppSubMenuComponent} from './shared/app.menu.component';
import {AppTopbarComponent} from './shared/app.topbar.component';
import {AppFooterComponent} from './shared/app.footer.component';
import {AppBreadcrumbComponent} from './shared/app.breadcrumb.component';
import {AppRightpanelComponent} from './shared/app.rightpanel.component';
import {AppInlineProfileComponent} from './shared/app.profile.component';
import {BreadcrumbService} from './shared/breadcrumb.service';
import {AppMainComponent} from './shared/app-main/app-main.component';
import { TirillaComponent } from './tirilla/tirilla.component';
import {DetailComponent} from './tirilla/detail.component';
import {PrimasComponent} from './primas/listar.component';
import {CesantiasComponent} from './cesantias/listar.component';
import {VacacionesComponent} from './vacaciones/listar.component';
import {CesantiasdetailComponent} from './cesantias/detail.component';
import {VacacionesdetailComponent} from './vacaciones/detail.component';
import {PrimasdetailComponent} from './primas/detail.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './_services/auth.guard.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        AppComponent,
        AppMainComponent,
        AppMenuComponent,
        AppSubMenuComponent,
        AppTopbarComponent,
        AppFooterComponent,
        AppBreadcrumbComponent,
        AppRightpanelComponent,
        AppInlineProfileComponent,
        TirillaComponent,
        DetailComponent,
        CesantiasComponent,
        CesantiasdetailComponent,
        VacacionesComponent,
        VacacionesdetailComponent,
        PrimasComponent,
        PrimasdetailComponent,
        ProfileComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        BreadcrumbService,
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
