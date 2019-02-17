import { Component, OnInit } from '@angular/core';

import { RelatorioService } from './../relatorio.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { EmpresaService } from 'app/empresas/empresa.service';
import { FuncionarioService } from 'app/funcionarios/funcionario.service';

@Component({
  selector: 'app-relatorio-pesquisa',
  templateUrl: './relatorio-pesquisa.component.html',
  styleUrls: ['./relatorio-pesquisa.component.css']
})
export class RelatorioPesquisaComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;
  empresas = [];
  funcionarios = [];
  codEmpresa: number;
  codFuncionario: number;

  constructor(
    private relatorioService: RelatorioService,
    private empresaService: EmpresaService,
    private funcionarioService: FuncionarioService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarEmpresas();
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.funcionarioService.pesquisarTodos()
      .then(funcionarios => {
        this.funcionarios = funcionarios
          .map(p => ({ label: p.nome, value: p.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarEmpresas() {
    this.empresaService.pesquisarTodas()
      .then(empresas => {
        this.empresas = empresas.map(c => {
          return { label: c.nome, value: c.codigo };
        });
      });
  }

  gerar() {
    this.relatorioService.relatorioAgendamentosPorEmpresa(this.periodoInicio, this.periodoFim, this.codEmpresa, this.codFuncionario)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
        this.codEmpresa = null;
        this.codFuncionario = null;
      });
  }

}
