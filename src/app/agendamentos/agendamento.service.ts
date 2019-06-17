import { Agendamento, Agenda, Funcionario, Empresa } from './../core/model';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import * as moment from 'moment';
import { environment } from 'environments/environment';

export class AgendamentoFiltro {
  observacao: string;
  dataExameDe: Date;
  dataExameAte: Date;
  laudoGerado: boolean;
  empresa: Empresa;
  funcionario: Funcionario;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class AgendamentoService {

  agendamentosUrl: string;
  motivosUrl: string;
  agendasUrl: string;

  constructor(private http: AuthHttp) {
    this.agendamentosUrl = `${environment.apiUrl}/agendamentos`;
    this.motivosUrl = `${environment.apiUrl}/motivos`;
    this.agendasUrl = `${environment.apiUrl}/agendas`;
  }

  pesquisar(filtro: AgendamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.observacao) {
      params.set('observacao', filtro.observacao);
    }
    if (filtro.dataExameDe) {
      params.set('dataExameDe', moment(filtro.dataExameDe).format('YYYY-MM-DD'));
    }
    if (filtro.dataExameAte) {
      params.set('dataExameAte', moment(filtro.dataExameAte).format('YYYY-MM-DD'));
    }
    if (filtro.laudoGerado) {
      params.set('laudoGerado', filtro.laudoGerado.toString());
    }

    if (filtro.empresa) {
      params.set('codEmpresa', filtro.empresa.codigo.toString());
    }
    if (filtro.funcionario) {
      params.set('codFuncionario', filtro.funcionario.codigo.toString());
    }

    return this.http.get(`${this.agendamentosUrl}`,
      { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const agendamentos = responseJson.content;

        const resultado = {
          agendamentos,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  pesquisarAgendamentosParaLaudo(): Promise<any> {
    return this.http.get(`${this.agendamentosUrl}/laudos/gerar`)
      .toPromise()
      .then(response => response.json().content);
  }

  adicionar(agendamento: Agendamento): Promise<Agendamento> {

    return this.http.post(this.agendamentosUrl,
      JSON.stringify(agendamento))
      .toPromise()
      .then(response => response.json());

  }

  atualizar(func: Agendamento): Promise<Agendamento> {
    return this.http.put(`${this.agendamentosUrl}/${func.codigo}`,
      JSON.stringify(func))
      .toPromise()
      .then(response => response.json());

  }

  buscarPorCodigo(codigo: number): Promise<Agendamento> {
    return this.http.get(`${this.agendamentosUrl}/${codigo}`)
      .toPromise()
      .then(agendamento => {
        const func = agendamento.json() as Agendamento
        return func;
      });
  }

  pesquisarMotivos(): Promise<any> {

    return this.http.get(this.motivosUrl)
      .toPromise()
      .then(response => {
        const motivos = response.json();
        return motivos;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.agendamentosUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

}
