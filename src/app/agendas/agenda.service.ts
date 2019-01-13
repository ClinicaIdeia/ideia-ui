import { Agenda } from './../core/model';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import * as moment from 'moment';

export class AgendaFiltro {
  diaAgendaDe: Date;
  diaAgendaAte: Date;
  observacao: string;
  codMotivo: number;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class AgendaService {

  agendasUrl: string;
  motivosUrl: string;
  permissoesUrl: string;

  constructor(private http: AuthHttp) {
    this.agendasUrl = `${environment.apiUrl}/agendas`;
    this.motivosUrl = `${environment.apiUrl}/motivos`;
  }

  buscarMotivos(): Promise<any> {

    return this.http.get(this.motivosUrl)
      .toPromise()
      .then(response => {
        const motivos = response.json();
        return motivos;
      });
  }

  buscarAgendasDisponiveis(): Promise<any> {

    return this.http.get(this.agendasUrl)
      .toPromise()
      .then(response => {
        const agendas = response.json();
        return agendas;
      });
  }

  pesquisar(filtro: AgendaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.diaAgendaDe) {
      params.set('diaAgendaDe', moment(filtro.diaAgendaDe).format('YYYY-MM-DD'));
    }
    if (filtro.diaAgendaAte) {
      params.set('diaAgendaAte', moment(filtro.diaAgendaAte).format('YYYY-MM-DD'));
    }
    if (filtro.observacao) {
      params.set('observacao', filtro.observacao);
    }

    return this.http.get(`${this.agendasUrl}`,
      { search: params })
      .toPromise()
      .then(response => response.json().content);
  }

  adicionar(agenda: Agenda): Promise<Agenda> {

    return this.http.post(this.agendasUrl,
      JSON.stringify(agenda))
      .toPromise()
      .then(response => response.json());

  }

  atualizar(func: Agenda): Promise<Agenda> {
    return this.http.put(`${this.agendasUrl}/${func.codigo}`,
      JSON.stringify(func))
      .toPromise()
      .then(response => response.json());

  }

  buscaPorCodigo(codigo: number): Promise<Agenda> {
    return this.http.get(`${this.agendasUrl}/${codigo}`)
      .toPromise()
      .then(agenda => {
        const age = agenda.json() as Agenda
        this.converterStringsParaDatas([age]);
        return age;
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
    return this.http.delete(`${this.agendasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  private converterStringsParaDatas(agendas: Agenda[]) {
    for (const agenda of agendas) {
      agenda.diaAgenda = moment(agenda.diaAgenda, 'YYYY-MM-DD').toDate();
    }
  }

}
