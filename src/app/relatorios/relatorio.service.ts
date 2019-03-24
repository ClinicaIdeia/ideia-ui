import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import { ResponseContentType, URLSearchParams } from '@angular/http';

import * as moment from 'moment';
import { AuthService } from 'app/seguranca/auth.service';

@Injectable()
export class RelatorioService {

  relatoriosUrl: string;

  constructor(private http: AuthHttp,
    public auth: AuthService) {
    this.relatoriosUrl = `${environment.apiUrl}/relatorios`;
  }

  relatorioAgendamentosPorEmpresa(inicio: Date, fim: Date, codEmpresa: number, codFuncionario: number) {
    const params = new URLSearchParams();
    // let cod_empresa = this.auth.jwtPayload.cod_empresa;
    // if (codEmpresa) {
    //   cod_empresa = codEmpresa;
    // }
    //Refatorar para pegar a empresa do usario se este nao for admin

    params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
    params.set('fim', moment(fim).format('YYYY-MM-DD'));
    if (!codEmpresa) {
      codEmpresa = 0;
    }
    if (!codFuncionario) {
      codFuncionario = 0;
    }

    return this.http.get(`${this.relatoriosUrl}/agendamentos/${codEmpresa}/${codFuncionario}`,
      { search: params, responseType: ResponseContentType.Blob })
      .toPromise()
      .then(response => response.blob());
  }

  relatorioLaudo(codigo: number) {

    return this.http.get(`${this.relatoriosUrl}/laudo/${codigo}`,
      { responseType: ResponseContentType.Blob })
      .toPromise()
      .then(response => response.blob());
  }

  impressaoCadastro(codigo: number) {
    return this.http.get(`${this.relatoriosUrl}/funcionario/${codigo}`,
      { responseType: ResponseContentType.Blob })
      .toPromise()
      .then(response => response.blob());
  }

}

