import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { Laudo, Funcionario } from 'app/core/model';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { Http, Headers, URLSearchParams } from '@angular/http';
export class LaudoFiltro {
  dataAgendamentoDe: Date;
  dataAgendamentoAte: Date;
  codEmpresa: number;
  funcionario: Funcionario;
  observacao: string;
  motivo: string;
  pagina = 0;
  itensPorPagina = 5;
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

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.observacao) {
      params.set('observacao', filtro.observacao);
    }
    if (filtro.motivo) {
      params.set('motivo', filtro.motivo);
    }
    if (filtro.codEmpresa) {
      params.set('codEmpresa', filtro.codEmpresa.toString());
    }
    if (filtro.funcionario) {
      params.set('codFuncionario', filtro.funcionario.codigo.toString());
    }
    if (filtro.dataAgendamentoDe) {
      params.set('dataAgendamentoDe', moment(filtro.dataAgendamentoDe).format('YYYY-MM-DD'));
    }
    if (filtro.dataAgendamentoAte) {
      params.set('dataAgendamentoAte', moment(filtro.dataAgendamentoAte).format('YYYY-MM-DD'));
    }
    return this.http.get(`${this.laudosUrl}`,
      { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const laudos = responseJson.content;

        const resultado = {
          laudos,
          total: responseJson.totalElements
        };

        return resultado;
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

