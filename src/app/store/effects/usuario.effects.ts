import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap, of } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from "../actions";

@Injectable()
export class UsuarioEffects {

  constructor(
    //$ -> es un observable
    private actions$: Actions,
    private usuarioService: UsuarioService
  ) { }


  cargarUsuario = createEffect(
    () => this.actions$.pipe(
      //Especifico cual es la acción que quiero escuchar
      ofType( cargarUsuario ),
      tap( data => console.log('effect tap ', data) ),
      mergeMap(
        ({ id }) => this.usuarioService.getUserById(id)
        .pipe(
          tap( data => console.log('getUserById effect ',data) ),
          map( user => cargarUsuarioSuccess({ usuario: user }) ),
          catchError( err => of(cargarUsuarioError({ payload: err })) )
        )
      )
    )
  );

}
