import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap, of } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";
import { cargarUsuarios, cargarUsuariosSuccess } from "../actions";
import { cargarUsuariosError } from '../actions/usuarios.actions';

@Injectable()
export class UsuariosEffects {

  constructor(
    //$ -> es un observable
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) { }


  cargarUsuarios = createEffect(
    () => this.actions$.pipe(
      //Especifico cual es la acción que quiero escuchar
      ofType( cargarUsuarios ),
      tap( data => console.log('effect tap ', data) ),
      mergeMap(
        () => this.usuarioService.getUsers()
        .pipe(
          tap( data => console.log('getUsers effect ',data) ),
          map( users => cargarUsuariosSuccess({ usuarios: users }) ),
          catchError( err => of(cargarUsuariosError({ payload: err })) )
        )
      )
    )
  );

}
