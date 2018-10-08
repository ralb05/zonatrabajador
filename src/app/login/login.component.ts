import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Myaccount} from '../_models/myaccount';
import {Router} from '@angular/router';
import {Message} from 'primeng/primeng';

@Component( {
              templateUrl: 'login.component.html',
              styleUrls: ['./login.component.css']
            } )
export class LoginComponent implements OnInit {
  fieldUserName = '';
  fieldPassword = '';
  msgs: Array<Message> = [];

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }
  ngOnInit() {
  }

  signIn(): void {
    this.authenticationService.login(this.fieldUserName, this.fieldPassword)
    .subscribe(data => {
      let datos: Myaccount;
      if( datos = data[0]) {
        if (datos.response === true) {
          localStorage.setItem('documento', datos.documento);
          localStorage.setItem('asociado', datos.asociado_id);
          localStorage.setItem('token', datos.token);
          localStorage.setItem('nombre', datos.nombre);
          this.router.navigate(['/']);
        } else  {
          this.showError(datos.response);
        }
      } else  {
        this.showError(datos.response);
      }
    });
  }

  showError(text: string | any): void {
    this.msgs = [];
    if(text) {
      this.msgs.push({severity: 'error', summary: 'Error', detail: text});
    }
    setTimeout(() => this.msgs = [], 3000);
  }
}
