import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: []
})
export class ListaComponent implements OnInit, OnDestroy {

  public usuarios: Usuario[] = [];
  private _subs?: Subscription;
  public loading: boolean = false;
  public error: any;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.store.select('usuarios').subscribe(({users, loading, error}) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    })

    this.store.dispatch( cargarUsuarios() )

  }

  ngOnDestroy(): void {
    this._subs?.unsubscribe();
  }

}
