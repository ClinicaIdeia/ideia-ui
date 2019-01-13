import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { Laudo } from 'app/core/model';
import { environment } from 'environments/environment';

export class LaudoFiltro {
  dataLaudoDe: Date;
  dataLaudoAte: Date;
  empresa: number;
  funcionario: number;
  observacao: string;
}

@Injectable()
export class LaudoService {

  laudosUrl: string;

  constructor(private http: AuthHttp) {
    this.laudosUrl = `${environment.apiUrl}/laudos`;
  }

  adicionar(laudo: Laudo): Promise<Laudo> {

    return this.http.post(this.laudosUrl,
      JSON.stringify(laudo))
      .toPromise()
      .then(response => response.json());

  }

  atualizar(laudo: Laudo): Promise<Laudo> {
    return this.http.put(`${this.laudosUrl}/${laudo.codigo}`,
      JSON.stringify(laudo))
      .toPromise()
      .then(response => response.json());

  }

  pesquisar(filtro: LaudoFiltro): Promise<any> {
    const params = new URLSearchParams();

    // if (filtro.nome) {
    //   params.set('nome', filtro.nome);
    // }
    // if (filtro.telefone) {
    //   params.set('telefone', filtro.telefone);
    // }
    // if (filtro.cnpj) {
    //   params.set('cnpj', filtro.cnpj);
    // }
    // if (filtro.email) {
    //   params.set('email', filtro.email);
    // }

    return this.http.get(`${this.laudosUrl}`,
      { search: filtro })
      .toPromise()
      .then(response => {
        const laudos = response.json().content;
        return laudos;
      });
  }

  pesquisarTodas(): Promise<any> {

    return this.http.get(this.laudosUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  buscarPorCodigo(codigo: number): Promise<Laudo> {
    return this.http.get(`${this.laudosUrl}/${codigo}`)
      .toPromise()
      .then(laudo => {
        const emp = laudo.json() as Laudo
        return emp;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.laudosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}

