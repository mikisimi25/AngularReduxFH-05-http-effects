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

  public getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this._url}/users?per_page=6`)
      .pipe(
        map( (resp: any) => resp['data'] )
      )
  }
}
