import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: []
})
export class ListaComponent implements OnInit, OnDestroy {

  public usuarios: Usuario[] = [];
  private _subs?: Subscription;

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {

    this._subs = this.usuarioService.getUsers().subscribe( usuarios => this.usuarios = usuarios)

  }

  ngOnDestroy(): void {
    this._subs?.unsubscribe();
  }

}
