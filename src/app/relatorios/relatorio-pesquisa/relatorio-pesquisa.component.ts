import { Component, OnInit } from '@angular/core';

import { RelatorioService, relatorioFiltro } from './../relatorio.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { EmpresaService } from 'app/empresas/empresa.service';
import { FuncionarioService } from 'app/funcionarios/funcionario.service';
import { Funcionario, Empresa } from 'app/core/model';

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
  filtro = new relatorioFiltro();
  filteredFuncionariosSingle: any[];
  filteredEmpresasSingle: any[];
  pt: any;

  constructor(
    private relatorioService: RelatorioService,
    private empresaService: EmpresaService,
    private funcionarioService: FuncionarioService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarEmpresas();
    this.carregarFuncionarios();
    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Do", "Sg", "Te", "Qa", "Qu", "Sx", "Sb"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: 'Hoje',
      clear: 'Limpar'
    };
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
    if (this.filtro.empresa) {
      this.codEmpresa = this.filtro.empresa.codigo;
    }
    if (this.filtro.funcionario) {
      this.codFuncionario = this.filtro.funcionario.codigo;
    }
    this.relatorioService.relatorioAgendamentosPorEmpresa(this.periodoInicio, this.periodoFim, this.codEmpresa, this.codFuncionario)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
        this.codEmpresa = null;
        this.codFuncionario = null;
      }).catch(erro => this.errorHandler.handle(erro));
  }

  filteredFuncionarioSingle(event) {
    let query = event.query;
    this.funcionarioService.listarTodosAutoComplete(event.query)
      .then(funcionarios => {
        this.filteredFuncionariosSingle = this.filterFuncionarioName(query, funcionarios);
      });
  }

  filterFuncionarioName(query, funcionarios: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < funcionarios.length; i++) {
      let funcionario = funcionarios[i];
      if (funcionario.nome.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(funcionario);
      }
    }
    return filtered;
  }

  filteredEmpresaSingle(event) {
    let query = event.query;
    this.empresaService.listarTodosAutoComplete(event.query)
      .then(empresas => {
        this.filteredEmpresasSingle = this.filterEmpresaName(query, empresas);
      });
  }

  filterEmpresaName(query, empresas: any[]): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < empresas.length; i++) {
      let empresa = empresas[i];
      if (empresa.nome.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(empresa);
      }
    }
    return filtered;
  }

}
