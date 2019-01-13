import { Agendamento, Agenda } from './../core/model';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import * as moment from 'moment';
import { environment } from 'environments/environment';
import { AgendaFiltro } from 'app/agendas/agenda.service';

export class AgendamentoFiltro {
  observacao: string;
  dataExameDe: Date;
  dataExameAte: Date;
  laudoGerado = "false";
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
      params.set('laudoGerado', filtro.laudoGerado);
    }

    return this.http.get(`${this.agendamentosUrl}`,
      { search: params })
      .toPromise()
      .then(response => response.json().content);
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

  pesquisarAgendas(codMotivo: number): Promise<any> {
    const params = new URLSearchParams();

    const filtro = new AgendaFiltro();
    if (codMotivo) {
      filtro.codMotivo = codMotivo;
      params.set('codMotivo', codMotivo.toString());
    }

    return this.http.get(`${this.agendasUrl}`,
      { search: filtro })
      .toPromise()
      .then(response => {
        const agendas = response.json();
        this.converterDatasAgendas(agendas);
        return agendas;
      });
  }

  private converterDatasAgendas(agendas: Agenda[]) {
    agendas['content'].forEach(agenda => {
      agenda.diaAgenda = moment(agenda.diaAgenda, 'YYYY-MM-DD').format('DD/MM/YYYY');
    });
  }

  // Chamar no busca por codigo e na atualização
  private converterStringsParaDatas(agendamentos: Agendamento[]) {
    for (const agendamento of agendamentos) {
      // agendamento.horario.dataExame = moment(agendamento.horario.dataExame,
      //   'YYYY-MM-DD').toDate();

      // if (agendamento.dataPagamento) {
      //   agendamento.dataPagamento = moment(agendamento.dataPagamento,
      //     'YYYY-MM-DD').toDate();
      // }
    }
  }

}
