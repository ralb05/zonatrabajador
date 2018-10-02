import {Injectable} from '@angular/core';
import {AppSettings} from '../../proyect.conf';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
              providedIn: 'root'
            })

export class TirillasService {
  private serviceUrl = AppSettings.serviceUrl;
  private serviceKey = AppSettings.serviceKey;
  asociado = localStorage.getItem('asociado');
  documento = localStorage.getItem('documento');
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
  }

  getList() {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apilistar`, {params: httpParams});
  }

  getById(id: string) {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado)
    .append("id", id);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apiver`, {params: httpParams});
  }

}
