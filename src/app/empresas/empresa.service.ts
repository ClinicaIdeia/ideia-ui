import { Endereco } from './../core/model';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { Empresa } from 'app/core/model';
import { environment } from 'environments/environment';

export class EmpresaFiltro {
  nome: string;
  telefone: string;
  cnpj: string;
  email: string;
}

@Injectable()
export class EmpresaService {

  empresasUrl: string;
  cepUrl: string;

  constructor(private http: AuthHttp) {
    this.empresasUrl = `${environment.apiUrl}/empresas`;
    this.cepUrl = `${environment.apiUrl}/cep`;
  }

  adicionar(empresa: Empresa): Promise<Empresa> {

    return this.http.post(this.empresasUrl,
      JSON.stringify(empresa))
      .toPromise()
      .then(response => response.json());

  }

  atualizar(empresa: Empresa): Promise<Empresa> {
    return this.http.put(`${this.empresasUrl}/${empresa.codigo}`,
      JSON.stringify(empresa))
      .toPromise()
      .then(response => response.json());

  }

  pesquisar(filtro: EmpresaFiltro): Promise<any> {
    const params = new URLSearchParams();

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }
    if (filtro.telefone) {
      params.set('telefone', filtro.telefone);
    }
    if (filtro.cnpj) {
      params.set('cnpj', filtro.cnpj);
    }
    if (filtro.email) {
      params.set('email', filtro.email);
    }

    return this.http.get(`${this.empresasUrl}`,
      { search: filtro })
      .toPromise()
      .then(response => {
        const empresas = response.json().content;
        return empresas;
      });
  }

  pesquisarTodas(): Promise<any> {

    return this.http.get(this.empresasUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  buscaPorCodigo(codigo: number): Promise<Empresa> {
    return this.http.get(`${this.empresasUrl}/${codigo}`)
      .toPromise()
      .then(empresa => {
        const emp = empresa.json() as Empresa
        return emp;
      });
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
