import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable,pluck } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _url: string = 'https://reqres.in/api';

  constructor(
    private http: HttpClient
  ) { }

  public getUsers() {
    return this.http.get(`${this._url}/users?per_page=6&delay=3`)
      .pipe(
        map( (resp: any) => resp['data'] )
      )
  }

  public getUserById( id: string ) {
    return this.http.get(`${this._url}/users/${ id }`)
      .pipe(
        map( (resp: any) => resp['data'] )
      )
  }
}
