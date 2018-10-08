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

  getList(): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apilistar`, {params: httpParams});
  }

  getById(id: string): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado)
    .append("id", id);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apiver`, {params: httpParams});
  }

  getListPrimas(): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apilistarprimas`, {params: httpParams});
  }

  getByIdPrimas(id: string): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado)
    .append("id", id);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apiverprimas`, {params: httpParams});
  }

  getListCesantias(): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apilistarcesantias`, {params: httpParams});
  }

  getByIdCesantias(id: string): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado)
    .append("id", id);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apivercesantias`, {params: httpParams});
  }

  getListVacaciones(): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apilistarvacaciones`, {params: httpParams});
  }

  getByIdVacaciones(id: string): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado)
    .append("id", id);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apivervacaciones`, {params: httpParams});
  }

  getDatosbasicos(): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apidatosbasicos`, {params: httpParams});
  }

  getDatoscontacto(): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apidatoscontacto`, {params: httpParams});
  }

  getDepartamentos(): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apigetdepartamentos`, {params: httpParams});
  }

  getCiudades(id): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado)
    .append("id", id);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apigetciudades`, {params: httpParams});
  }

  getTipodesangre(): Observable<any> {
    const httpParams = new HttpParams()
    .append("apikey", this.serviceKey)
    .append("token", this.token)
    .append("documento", this.documento)
    .append("asociado_id", this.asociado);
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apigettipodesangre`, {params: httpParams});
  }


  save(obj: any): Observable<any> {
    obj['apikey'] = this.serviceKey;
    obj['token'] = this.token;
    obj['documento'] = this.documento;
    obj['asociado_id'] = this.asociado;
    return this.http.get<any>(`${this.serviceUrl}zonatrabajador/api/apiupdateasociado`, {params: obj});

  }

}
