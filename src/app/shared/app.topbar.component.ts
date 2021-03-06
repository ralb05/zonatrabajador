import {Component} from '@angular/core';
import {AppMainComponent} from './app-main/app-main.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <div class="logo"></div>
            </div>

            <div class="topbar-right">
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i></i>
                </a>
                <a id="rightpanel-menu-button" href="#" (click)="app.logout($event)">
                    <i class="material-icons">power_settings_new</i>
                </a>
<!--
                <a id="rightpanel-menu-button" href="#" (click)="app.onRightPanelButtonClick($event)">
                    <i class="material-icons">more_vert</i>
                </a>-->

                <!--<a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="material-icons">menu</i>
                </a>-->
            </div>
        </div>
    `
})
export class AppTopbarComponent {

    constructor(public app: AppMainComponent) {}

}
