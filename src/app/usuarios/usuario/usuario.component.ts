import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { cargarUsuario } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  public usuario?: Usuario;

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.store.select('usuario').subscribe(({ user }) => {
      this.usuario = user;
    })

    this.router.params.subscribe( ({id}) => {
      this.store.dispatch( cargarUsuario({ id }) )
    })

  }

}
