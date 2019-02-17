import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Funcionario, Endereco } from 'app/core/model';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';
import * as moment from 'moment';

export interface FuncionarioFiltro {
  nome: string;
  telefone: string;
  cpf: string;
}

@Injectable()
export class FuncionarioService {

  funcionariosUrl: string;
  cepUrl: string;

  constructor(private http: AuthHttp) {
    this.funcionariosUrl = `${environment.apiUrl}/funcionarios`;
    this.cepUrl = `${environment.apiUrl}/cep`;
  }

  urlUploadAnexo(): string {
    return `${this.funcionariosUrl}/anexo`;
  }

  pesquisar(filtro: FuncionarioFiltro): Promise<any> {
    const params = new URLSearchParams();

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
    if (filtro.telefone) {
      params.set('telefone', filtro.telefone);
    }
    if (filtro.cpf) {
      params.set('cpf', filtro.cpf);
    }

    return this.http.get(`${this.funcionariosUrl}`,
      { search: filtro })
      .toPromise()
      .then(response => response.json().content);
  }

  adicionar(funcionario: Funcionario): Promise<Funcionario> {

    return this.http.post(this.funcionariosUrl,
      JSON.stringify(funcionario))
      .toPromise()
      .then(response => response.json());

  }

  atualizar(func: Funcionario): Promise<Funcionario> {
    return this.http.put(`${this.funcionariosUrl}/${func.codigo}`,
      JSON.stringify(func))
      .toPromise()
      .then(response => response.json());

  }

  buscaPorCodigo(codigo: number): Promise<Funcionario> {
    return this.http.get(`${this.funcionariosUrl}/${codigo}`)
      .toPromise()
      .then(funcionario => {
        const func = funcionario.json() as Funcionario
        // this.converterStringsParaDatas([func]);
        return func;
      });
  }

  buscaPorCPF(cpf: string): Promise<Funcionario> {
    return this.http.get(`${this.funcionariosUrl}/cpf?cpf=${cpf}`)
      .toPromise()
      .then(funcionario => {
        const func = funcionario.json() as Funcionario
        return func;
      });
  }

  pesquisarTodos(): Promise<any> {

    return this.http.get(`${this.funcionariosUrl}`)
      .toPromise()
      .then(response => response.json().content);
  }

  carregarEndereco(cep: string): Promise<Endereco> {
    cep = cep.replace('.', '').replace('-', '');
    return this.http.get(`${this.cepUrl}/${cep}`)
      .toPromise()
      .then(ret => {
        const emp = ret.json() as Endereco;
        return emp;
      });
  }

}
