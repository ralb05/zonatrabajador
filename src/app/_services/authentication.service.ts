import { Injectable } from '@angular/core';
import { AppSettings } from '../../proyect.conf';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Myaccount } from '../_models/myaccount';

@Injectable({
              providedIn: 'root'
            })
export class AuthenticationService {
  public token: string;
  public headers = new HttpHeaders();
  private serviceUrl = AppSettings.serviceUrl;
  private serviceKey = AppSettings.serviceKey;

  constructor( private http: HttpClient) {
  }

  login( username: string, password: string ) {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("documento", username)
    .append("password", password);
    return this.http.post<Myaccount>( `${this.serviceUrl}zonatrabajador/index/apilogin`, httpParams );
  }

  setToken(token: string): void {
     localStorage.setItem( 'token', token );
  }

  setUser(userid: string): void {
    localStorage.setItem( 'userid', userid);
  }

  setEmail(email: string): void {
    localStorage.setItem( 'email', email);
  }

  getToken(): string {
    return localStorage.getItem( 'token' );
  }

  getUser(): string {
    return localStorage.getItem('userid');
  }

  getEmail(): string {
    return localStorage.getItem('email');
  }

  setMySites(sitios: Myaccount): void {
    localStorage.setItem( 'sitios',  JSON.stringify(sitios) );
  }

  getMySites(): Myaccount {
    return JSON.parse(localStorage.getItem('sitios'));
  }

  loggedIn(): boolean {
    const token = this.getToken();
    if ( token ) {
      return true
    }else{
      return false
    }
  }



   logout(): void {
      localStorage.removeItem( 'token' );
      localStorage.removeItem( 'userid' );
      localStorage.removeItem( 'sitios' );
      localStorage.removeItem( 'email' );
   }

  setMyaccount(){
    /*const userid = this.getUser();
    const token = this.getToken();
    let headers = new HttpHeaders();
    headers = headers.append('userid', userid).append('token', token);
    return this.http.get<Myaccount>( this.serviceUrl + '/myaccount.json', { headers })
    .map( res => {
      /!*res.multisite.splice( res.multisite.indexOf( res.multisite.find( m => m.id === res.site_id ) ), 1 );*!/
      mixpanel.track("user-get-myaccount",{"site": res.sitio, "email":localStorage.getItem('email')});
      this.setMySites( res);
      return res;
    });*/
  }
  changeMyaccount(id:string){
   /* const userid = this.getUser();
    const token = this.getToken();
    let headers = new HttpHeaders();
    headers = headers.append('userid', userid).append('token', token);
    //return this.http.get<Myaccount>( this.serviceUrl + '/myaccount.json', { headers });
    mixpanel.track("user-change-myaccount",{"site_id": id, "email":this.getEmail()});
    return this.http.put<Myaccount>( this.serviceUrl + '/usermultisites/'+id+'.json',{site_id: id}, { headers } );*/
  }
}
