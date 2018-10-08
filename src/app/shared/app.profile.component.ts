import {Component} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
import {AppMainComponent} from './app-main/app-main.component';

@Component({
    selector: 'app-inline-profile',
    template: `
        <div class="profile" [ngClass]="{'profile-expanded':active}">
                <!--<img class="profile-image" src="assets/layout/images/avatar1.png" />-->
                <i class="material-icons" style="font-size: 24px">face</i><br>
                <span class="profile-name">{{ name }}</span>
        </div>

        <ul class="ultima-menu profile-menu" [@menu]="active ? 'visible' : 'hidden'">
            <li role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">person</i>
                    <span>Profile</span>
                </a>
            </li>
            <li role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">security</i>
                    <span>Privacy</span>
                </a>
            </li>
            <li role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">settings_application</i>
                    <span>Settings</span>
                </a>
            </li>
            <li role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">power_settings_new</i>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    `,
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppInlineProfileComponent {

    active: boolean;
    name: string;
    constructor(public app: AppMainComponent) {
      this.name = localStorage.getItem('nombre');
    }

    onClick(event) {
        this.active = !this.active;
        setTimeout(() => {
          this.app.layoutMenuScrollerViewChild.moveBar();
        }, 450);
        event.preventDefault();
    }
}
