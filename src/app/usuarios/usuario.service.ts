import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Usuario, SenhaAlterar } from 'app/core/model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { URLSearchParams } from '@angular/http';

export class UsuarioFiltro {
  nome: string;
  email: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class UsuarioService {

  usuariosUrl: string;
  permissoesUrl: string;

  constructor(private http: AuthHttp) {
    this.usuariosUrl = `${environment.apiUrl}/usuarios`;
    this.permissoesUrl = `${environment.apiUrl}/permissoes`;
  }

  pesquisar(filtro: UsuarioFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
    if (filtro.email) {
      params.set('email', filtro.email);
    }

    return this.http.get(`${this.usuariosUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const usuarios = responseJson.content;

        const resultado = {
          usuarios,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  adicionar(usuario: Usuario): Promise<Usuario> {

    return this.http.post(this.usuariosUrl,
      JSON.stringify(usuario))
      .toPromise()
      .then(response => response.json());

  }

  atualizar(func: Usuario): Promise<Usuario> {
    return this.http.put(`${this.usuariosUrl}/${func.codigo}`,
      JSON.stringify(func))
      .toPromise()
      .then(response => response.json());

  }

  trocarSenha(senhaAlterar: SenhaAlterar, codigo: number): Promise<Usuario> {
    return this.http.post(`${this.usuariosUrl}/senha/mudar/${codigo}`,
      JSON.stringify(senhaAlterar))
      .toPromise()
      .then(response => response.json());

  }

  buscaPorCodigo(codigo: number): Promise<Usuario> {
    return this.http.get(`${this.usuariosUrl}/${codigo}`)
      .toPromise()
      .then(usuario => {
        const func = usuario.json() as Usuario
        return func;
      });
  }

  pesquisarPermissoes(codigo: number): Promise<any> {

    return this.http.get(`${this.permissoesUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const permissoes = response.json();
        return permissoes;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.usuariosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
