import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Horario } from 'app/core/model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';

export class HorarioFiltro {
  nome: string;
  email: string;
}

@Injectable()
export class HorarioService {

  horariosUrl: string;
  permissoesUrl: string;

  constructor(private http: AuthHttp) {
    this.horariosUrl = `${environment.apiUrl}/horarios`;
    this.permissoesUrl = `${environment.apiUrl}/permissoes`;
  }

  pesquisar(filtro: HorarioFiltro): Promise<any> {
    const params = new URLSearchParams();

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
    if (filtro.email) {
      params.set('email', filtro.email);
    }

    return this.http.get(`${this.horariosUrl}`,
      { search: filtro })
      .toPromise()
      .then(response => response.json().content);
  }

  adicionar(horario: Horario): Promise<Horario> {

    return this.http.post(this.horariosUrl,
      JSON.stringify(horario))
      .toPromise()
      .then(response => response.json());

  }

  atualizar(func: Horario): Promise<Horario> {
    return this.http.put(`${this.horariosUrl}/${func.codigo}`,
      JSON.stringify(func))
      .toPromise()
      .then(response => response.json());

  }

  buscaPorCodigo(codigo: number): Promise<Horario> {
    return this.http.get(`${this.horariosUrl}/${codigo}`)
      .toPromise()
      .then(horario => {
        const func = horario.json() as Horario
        return func;
      });
  }

  pesquisarPermissoes(): Promise<any> {

    return this.http.get(this.permissoesUrl)
      .toPromise()
      .then(response => {
        const permissoes = response.json();
        return permissoes;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.horariosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
